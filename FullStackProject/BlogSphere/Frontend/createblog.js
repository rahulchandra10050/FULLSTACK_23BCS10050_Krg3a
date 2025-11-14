import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/blogs/create`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      if (response.ok) {
        setMessage("Blog Created.");
      } else {
        setMessage("Failed to create blog.");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error: " + error);
    }

    setTitle("");
    setContent("");
  };

  return (
    <div className="CreateBlogDiv">
      <h2>Create Your Own Blog!!</h2>

      <form onSubmit={handleCreateBlog}>
        <div className="CreateformDiv">
          <div className="titleDiv">
            <label>Title : </label>
            <input
              type="text"
              placeholder="Enter the title of your blog.."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="contentDiv">
            <label>Content : </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write your blog here..."
              modules={CreateBlog.modules}
              formats={CreateBlog.formats}
            />
          </div>
        </div>

        <div className="createBtn">
          <button className="btn" type="submit">
            Create
          </button>
        </div>
      </form>

      <p>{message}</p>
    </div>
  );
};

// Toolbar setup
CreateBlog.modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

CreateBlog.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

export default CreateBlog;
