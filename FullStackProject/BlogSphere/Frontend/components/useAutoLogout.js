// useAutoLogout.js
import { useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; 

const useAutoLogout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // ms
      const now = Date.now();
      const timeout = expirationTime - now;

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

        return () => clearTimeout(timer); // cleanup
      }
    } catch (err) {
      console.error("Invalid token:", err);
      logout();
      navigate("/login");
    }
  }, [navigate, logout]);
};

export default useAutoLogout;
