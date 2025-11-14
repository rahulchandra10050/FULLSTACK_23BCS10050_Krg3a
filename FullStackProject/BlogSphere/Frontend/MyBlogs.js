/*import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const MyBlogs = () => {
  
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const expandBlogId = (id) => {
    setExpandedBlogId(expandedBlogId === id ? null : id);
  };

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await fetch('http://localhost:8080/api/blogs/myblogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setError('Unauthorized: Please log in');
        setBlogs([]); 
        return;
      }

      const data = await response.json();
      console.log('My Blogs: ', data);

      if (Array.isArray(data)) {
        setBlogs(data);
        setError('');
      } else {
        setError('Unexpected response format for your blogs');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load your blogs');
    }
  };

  return (
    <div className="my-blog-home">
      <h1>📚 My Blog Posts</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {Array.isArray(blogs) && blogs.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
            <p>
              <strong>Author:</strong> {blog.author}
            </p>
            <p>
              <strong>Date:</strong>{' '}
              {new Date(blog.createdAt).toLocaleString()}
            </p>
            <p>
              {expandedBlogId === blog.id
                ? blog.content
                : blog.content.slice(0, 70) + '...'}
            </p>
            <button onClick={() => expandBlogId(blog.id)}>
              {expandedBlogId === blog.id ? 'Show less' : 'Read more'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBlogs;*/

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const [likedBlogs, setLikedBlogs] = useState({});
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchMyBlogs();
    fetchLikedBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/blogs/myblogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setError("Unauthorized: Please log in");
        setBlogs([]);
        return;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setBlogs(data);
        setError("");
      } else {
        setError("Unexpected response format for your blogs");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load your blogs");
    }
  };

  const fetchLikedBlogs = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/blogs/likedBlogs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const likedIds = await res.json();
        const likedState = {};
        likedIds.forEach((id) => {
          likedState[id] = true;
        });
        setLikedBlogs(likedState);
      }
    } catch (err) {
      console.error("Error fetching liked blogs", err);
    }
  };

  const expandBlogId = (id) => {
    setExpandedBlogId(expandedBlogId === id ? null : id);
  };

  const startEditing = (blog) => {
    setEditingBlogId(blog.id);
    setEditData({ title: blog.title, content: blog.content });
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

      if (res.ok) {
        alert("Blog updated successfully");
        cancelEditing();
        fetchMyBlogs();
      } else {
        const text = await res.text();
        alert(`Failed to update: ${text}`);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;
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
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } else {
        const errorText = await response.text();
        alert(`Failed to delete blog: ${errorText}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the blog.");
    }
  };

  const handleLike = async (blogId) => {
    const token = localStorage.getItem("token");
    const isLiked = likedBlogs[blogId] === true;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/blogs/likes/${blogId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const updatedBlog = await response.json();

      setLikedBlogs((prev) => ({
        ...prev,
        [blogId]: !isLiked,
      }));

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId
            ? {
                ...blog,
                likes: updatedBlog.likes,
                likedByUsernames: updatedBlog.likedByUsernames,
              }
            : blog
        )
      );
    } catch (err) {
      console.error("Like error:", err.message);
      alert("Failed to like/dislike the blog.");
    }
  };

  return (
    <div className="blog-home">
      <h1>📝 My Blog Posts</h1>
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
                  value={editData.title}
                  onChange={handleEditChange}
                  style={{ width: "100%", fontSize: "1.2rem", padding: "5px" }}
                />
                <textarea
                  name="content"
                  value={editData.content}
                  onChange={handleEditChange}
                  rows={3}
                  style={{ width: "100%", padding: "5px", fontSize: "18px" }}
                />
                <button onClick={() => saveChanges(blog.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                <h2 style={{ textTransform: "uppercase" }}>{blog.title}</h2>
                <p style={{}}>
                  <strong>Author:</strong> {blog.author} |{" "}
                  <strong>Date:</strong>{" "}
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
            {editingBlogId !== blog.id && (
              <button onClick={() => startEditing(blog)}>Edit</button>
            )}

            <div className="like-comment-share-div">
              <div className="like-comment-container">
                <div
                  className="like-dislike"
                  onClick={() => handleLike(blog.id)}
                  style={{ cursor: "pointer" }}
                >
                  {likedBlogs[blog.id] ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart color="gray" />
                  )}
                  <span className="like-count">{blog.likes}</span>
                </div>

                <div
                  className="comment-icon"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/comments/${blog.id}`, {
                      state: { totalComments: blog.totalComments },
                    })
                  }
                >
                  <FaRegComment />
                  <span className="comment-count">{blog.totalComments}</span>
                </div>
              </div>
              {blog.likes > 0 && (
                <p style={{ fontSize: "14px" }}>
                  <strong>Liked by:</strong> {blog.likedByUsernames.join(", ")}
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBlogs;
