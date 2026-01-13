import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth(); // Context se login function nikala
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      navigate("/"); // Login hone ke baad Home page par bhej do
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Login nahi ho paya! Console check karo.");
    }
  };

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to CampusFeedz 🎓</h1>
      <p>Apne college updates dekhne ke liye login karein.</p>
      
      <button 
        onClick={handleLogin} 
        className="btn" 
        style={{ marginTop: "20px", fontSize: "1.2rem" }}
      >
        Sign in with Google 🚀
      </button>
    </div>
  );
};

export default Login;