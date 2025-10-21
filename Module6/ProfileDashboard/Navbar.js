import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () =>{
    logout(); // context ke through token set karo
    localStorage.removeItem('User Email');
    setTimeout(() => navigate('/login'), 10);
  }

  return (
    <nav className="navbar">
      <h2>📝 Blog App</h2>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/myblogs">Your Blogs</Link>
        <Link to="/create-blog">Create Blog</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
