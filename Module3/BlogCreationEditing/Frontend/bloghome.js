
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./components/AuthContext";

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  //AUTO-LOGOUT FEATURE///////////////////////////////////
  // Auto-logout on JWT expiration
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now();
      const expirationTime = decoded.exp * 1000;
      const timeout = expirationTime - currentTime;

      if (timeout <= 0) {
        logout();
        localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        const timer = setTimeout(() => {
          logout();
          localStorage.removeItem("token");
          alert("Session expired. Please log in again.");
          navigate("/login");
        }, timeout);

        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      logout();
      navigate("/login");
    }
  }, [navigate]);

  ////////////////////////////////////////////
  useEffect(() => {
    fetchAllBlogs();
    fetchLikedBlogs();
  }, []);

  //////////////////////////////////////////////
  const fetchAllBlogs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/blogs`);
      const data = await response.json();
      if (Array.isArray(data)) {
        console.log(data);
        setBlogs(data);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load blogs");
    }
  };

  const expandBlogId = (id) => {
    setExpandedBlogId(expandedBlogId === id ? null : id);
  };

  //EDIT BLOG//////////////////////////////////////
  const startEditing = async (blog) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized: No token found");
      return;
    }

    try {
      // Send PUT request without changing data to only check authorization
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/blogs/edit/${blog.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: blog.title, content: blog.content }), // dummy same content
        }
      );

      if (res.status === 401) {
        const text = await res.text();
        alert(`Unauthorized: ${text}`);
        return;
      }

      if (res.ok) {
        setEditingBlogId(blog.id);
        setEditData({ title: blog.title, content: blog.content });
      } else {
        const text = await res.text();
        alert(`Failed to check edit access: ${text}`);
      }
    } catch (err) {
      console.error("Edit check failed:", err);
      alert("Something went wrong while checking edit permission.");
    }
  };

  const cancelEditing = () => {
    setEditingBlogId(null);
    setEditData({ title: "", content: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async (blogId) => {
    const token = localStorage.getItem("token");
    if (!editData.title.trim() || !editData.content.trim()) {
      alert("Title and content are required.");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/blogs/edit/${blogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        }
      );

      const text = await res.text();

      if (res.ok) {
        alert("Blog updated successfully");
        cancelEditing();
        fetchAllBlogs(); // Refresh updated data
      } else {
        alert(`Failed to update: ${text}`);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating");
    }
  };

  //DELETE BLOG///////////////////////////////////////
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized: No token found");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/blogs/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Blog deleted successfully");
        setBlogs(blogs.filter((blog) => blog.id !== id)); // Remove from UI
      } else {
        const errorText = await response.text();
        alert(`Failed to delete blog: ${errorText}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the blog.");
    }
  };


  return (
    <div className="blog-home">
      <h1>📚 Blog Posts</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {Array.isArray(blogs) && blogs.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="blog-card"
            style={{
              border: editingBlogId === blog.id ? "2px solid blue" : "none",
              backgroundColor: editingBlogId === blog.id ? "#f0f8ff" : "#fff",
            }}
          >
            {editingBlogId === blog.id ? (
              <>
                <input
                  name="title"
                  placeholder="Title"
                  value={editData.title}
                  onChange={handleEditChange}
                  style={{ width: "100%", fontSize: "1.2rem", padding: "5px" }}
                  required
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  value={editData.content}
                  onChange={handleEditChange}
                  rows={3}
                  required
                  style={{ width: "100%", padding: "5px", fontSize: "18px" }}
                />
              </>
            ) : (
              <>
                <h2 className="blog-title">{blog.title}</h2>
                <p style={{ }}>
                  <strong>Author:</strong> {blog.author} | <strong>Date:</strong>{" "}
                  {new Date(blog.createdAt).toLocaleString()}
                </p>
                <p>
                  {expandedBlogId === blog.id
                    ? blog.content
                    : blog.content.length > 100
                    ? blog.content.slice(0, 100) + "..."
                    : blog.content}
                </p>
              </>
            )}

            {blog.content.length > 100 && (
              <button onClick={() => expandBlogId(blog.id)}>
                {expandedBlogId === blog.id ? "Show less" : "Read more"}
              </button>
            )}

            <button onClick={() => handleDelete(blog.id)}>Delete</button>

            {editingBlogId === blog.id ? (
              <>
                <button onClick={() => saveChanges(blog.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <button onClick={() => startEditing(blog)}>Edit</button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BlogHome;
