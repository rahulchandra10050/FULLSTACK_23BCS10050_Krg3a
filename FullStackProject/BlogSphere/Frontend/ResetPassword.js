import React, { useState } from 'react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const token = new URLSearchParams(window.location.search).get('token');

  const handleReset = async () => {
    if (!newPassword) {
      setStatus("Please enter a new password.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/public/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const text = await response.text();
      setStatus(text);
    } catch (error) {
      console.error(error);
      setStatus("Error resetting password.");
    }
  };

  return (
    <div class="reset-pass">
      <h2>Set New Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset Password</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ResetPassword;
