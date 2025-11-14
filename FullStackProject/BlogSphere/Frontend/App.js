// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import BlogHome from './bloghome';
import CreateBlog from './createblog';
import Navbar from './components/Navbar';
import { AuthContext } from './components/AuthContext';
import { useContext } from 'react';
import MyBlogs from './MyBlogs';
import ProfilePage from './ProfilePage';
import CommentPage from './CommentPage';
import useAutoLogout from './components/useAutoLogout'; // ✅ Custom hook

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const { token } = useContext(AuthContext);
  useAutoLogout(); // ✅ Call it **inside** the Router context

  return (
    <div className="main-content">
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<BlogHome />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/comments/:blogId" element={<CommentPage />} />
      </Routes>
    </div>
  );
}

export default App;
