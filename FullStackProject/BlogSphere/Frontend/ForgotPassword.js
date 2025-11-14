import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSendResetLink = async () => {
    if (!email) {
      setStatus('Please enter your email.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/public/send-reset-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}), // sending plain email as raw string
      });

      const text = await response.text(); // get response text
      setStatus(text);
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while sending the email.');
    }
  };

  return (
    <div className="ForgotPasswordDiv">
      <h2>Forgot Password</h2>
      <p>Enter your email to receive a password reset link.</p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSendResetLink}>Send Reset Link</button>

      {status && <p>{status}</p>}

      <p>
        {/* <span
          style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={onBackToLogin}
        >
          Back to Login
        </span> */}
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
