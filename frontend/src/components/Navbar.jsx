import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout Failed", error);
    }
  }

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          CampusFeedz 🎓
        </Link>

        <div className="nav-links">
          
          {/* LOGIC: Agar User hai, tabhi Menu dikhao */}
          {user ? (
            <>
              <Link to="/" className="nav-link">🏠 Home</Link>
              <Link to="/qa" className="nav-link">💡 Q&A</Link>
              <Link to="/resources" className="nav-link">📚 Notes</Link>
              <Link to="/create" className="nav-link highlight-link">➕ Create</Link>
              <Link to="/profile" className="nav-link">👤 Profile</Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            // Agar User nahi hai, to sirf Login button dikhao
            <Link to="/login" className="btn btn-login">Login</Link>
          )}
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar