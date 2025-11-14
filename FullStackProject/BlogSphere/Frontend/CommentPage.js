import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const CommentPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/blogs/comments/${blogId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setComments(data);
      } else {
        console.error("Invalid response");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const postComment = async () => {
    const token = localStorage.getItem("token");
    if (!token || !newComment.trim()) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/blogs/comments/${blogId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment }),
        }
      );

      if (res.ok) {
        setNewComment("");
        fetchComments();

      } else {
        console.error("Failed to post comment");
      }
    } catch (err) {
      console.error("Post comment error:", err);
    }
  };

  const deleteComment = async(blogId,commentId)=>{
    const token=localStorage.getItem('token');
    if(!token) return;
    try {
      const response=await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/blogs/comments/delete`,{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify({blogId,commentId}),
      });
      const text = await response.text();
      alert(text);
      fetchComments();
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
  }

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffMs = now - createdAt;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  };

  return (
    <div className="comment-page">
      <button className="back-button" onClick={() => navigate("/home")}>
        ⬅ Back to Blogs
      </button>

        {comments.length>0 ? (
            <div>
          <h2 className="comment-heading">Comments</h2>
          <hr />
          <ul className="comment-list">
            {comments.map((c, i) => (
              <li key={i} className="comment-item">
                <div className="comment-info">
                  <strong>{c.username}</strong>
                  <p className="comment-date">{getTimeAgo(c.createdAt)}</p>
                </div>
                <div className="comment-content">
                  <p className="contentPara">{c.content}</p>
                  <MdOutlineDeleteOutline 
                  onClick={() => deleteComment(blogId, c.id)}
                  className="deleteCmnt-icon"/>
                </div>
              </li>
            ))}
          </ul>
          <hr />
        </div>
        ): (
          <div className="no-comment-div">
            No comments yet. Start the Conversation!
          </div>
        )}

      <div className="add-comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input"
        />
        <div onClick={postComment} className="comment-post-btn">
          <IoSend className="send-icon" size={22} />
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
