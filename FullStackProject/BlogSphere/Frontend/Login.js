import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from './components/AuthContext';
const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword,setShowPassword]=useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/public/signin`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setMessage('Login Success!');
        const data = await response.json();
        console.log(data)
        login(data.jwtToken); // context ke through token set karo
        localStorage.setItem('userEmail', data.username); //username is email

        setTimeout(() => navigate('/home'), 10);
      } else {
        setMessage('Email or password is incorrect.');
      }
    } catch (error) {
      console.log(error);
      setMessage('Error during login');
    }
  };

  const googleLogin=()=>{
    window.location.href=`${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/google`;
  }

  return (
    <div className="LoginDiv">
      <h2>Login</h2>
      <p>
        Enter your credentials to login!
      </p>
      <form className="LoginForm" onSubmit={handleLogin}>
        <div class="emailDiv">
            <label> Email :</label>
            <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>

        <div className="passDiv">
          <label>Password:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize:'17px',
                marginLeft: '-30px',
                marginTop:'10px'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div class="loginBtn">
            <button type="submit">Login</button>
        </div>
      </form>
      {message && <p>{message}</p>}
      {(!message || message == 'Email or password is incorrect.' )&& <p>
          {/* <span onClick={onForgotPassword}>
            Forgot Password?
          </span> */}
          <Link to="/forgot-password">Forgot Password?</Link>
      </p>}
      {message != 'Email or password is incorrect.' && <p>
          Don't have an account?{' '}
          {/* <span onClick={onSwitchToSignUp}>
            SignUp
          </span> */}
          <Link to="/signup">Sign Up</Link>
      </p>}
    </div>
  );
};

export default Login;
