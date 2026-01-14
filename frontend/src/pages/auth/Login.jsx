import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Google Login Button Clicked");
      await login();
      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Login Error: Console check karo");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to CampusFeedz 🎓</h1>
        <p className="login-subtitle">
          Connect with your campus. Join the community today.
        </p>
        
        <button onClick={handleLogin} className="google-btn">
          <span className="google-icon">G</span> 
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;