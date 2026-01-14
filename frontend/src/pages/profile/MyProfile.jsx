import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ADD THIS
import "./MyProfile.css";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // GET REAL USER DATA
  const [loading, setLoading] = useState(true);

  // Backend check - Console me data dikhega
  useEffect(() => {
    if (user) {
      console.log("✅ PROFILE PAGE - USER DATA FROM BACKEND:");
      console.log("👤 Name:", user.displayName);
      console.log("📧 Email:", user.email);
      console.log("🆔 User ID:", user.uid);
      console.log("📸 Photo:", user.photoURL);
      console.log("Full User Object:", user);
      setLoading(false);
    }
  }, [user]);

  // Mock data for points/badges (ye baad me database se laayenge)
  const userData = {
    points: 850,
    rank: "Campus Mentor",
    badges: ["Top Contributor", "Helpful Senior", "Verified Solver"],
  };

  if (loading) {
    return (
      <div style={{textAlign: 'center', marginTop: '50px'}}>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="feed-layout-wrapper">
      
      {/* 1. Sidebar Left */}
      <aside className="sidebar-left">
        <h2 className="app-brand">CampusFeedz</h2>
        <nav className="side-menu">
          <div className="menu-item" onClick={() => navigate("/")}>🏠 Home</div>
          <div className="menu-item">🔍 Discover</div>
          <div className="menu-item" onClick={() => navigate("/resources")}>📚 Resources</div>
          <div className="menu-item" onClick={() => navigate("/qa")}>💡 Q&A</div>
          <div className="menu-item active">👤 Profile</div>
        </nav>
        <button className="create-post-btn" onClick={() => navigate("/upload")}>
          + Create Post
        </button>
      </aside>

      {/* 2. Center Profile Section - NOW WITH REAL DATA */}
      <main className="feed-center-column">
        <div className="profile-scroll-box">
          <div className="profile-banner">
            <div className="profile-avatar-container">
              {/* REAL USER PHOTO from Google */}
              <img 
                src={user.photoURL || "https://i.pravatar.cc/150"} 
                alt={user.displayName}
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/150";
                }}
              />
            </div>
          </div>

          <div className="profile-details-main">
            {/* REAL USER NAME from Google */}
            <h1>{user.displayName || "Anonymous User"}</h1>
            
            {/* REAL USER EMAIL from Google */}
            <p style={{color: '#6b7280', fontSize: '14px', marginBottom: '5px'}}>
              📧 {user.email}
            </p>
            
            {/* USER ID for backend verification */}
            <p style={{
              fontSize: '11px',
              color: '#9ca3af',
              background: '#f3f4f6',
              padding: '6px 12px',
              borderRadius: '6px',
              display: 'inline-block',
              marginBottom: '15px'
            }}>
              🆔 ID: {user.uid.substring(0, 12)}...
            </p>
            
            <div className="profile-stats-grid">
              <div className="p-stat">
                <strong>{userData.points}</strong>
                <span>Points</span>
              </div>
              <div className="p-stat">
                <strong>{userData.rank}</strong>
                <span>Rank</span>
              </div>
            </div>

            <div className="badge-container-ui">
              <h4>Achievements & Badges 🏆</h4>
              <div className="badges-flex">
                {userData.badges.map((b, i) => (
                  <span key={i} className="badge-item-ui">⭐ {b}</span>
                ))}
              </div>
            </div>

            <div className="profile-tabs-ui">
              <button className="active">My Posts</button>
              <button>My Answers</button>
            </div>

            {/* Backend Status Indicator */}
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: '#ecfdf5',
              borderRadius: '8px',
              border: '1px solid #10b981'
            }}>
              <p style={{
                color: '#10b981',
                fontWeight: 'bold',
                fontSize: '14px',
                margin: 0
              }}>
                ✅ Connected to Firebase Backend
              </p>
              <p style={{
                color: '#059669',
                fontSize: '12px',
                margin: '5px 0 0 0'
              }}>
                Profile data loaded from authentication system
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Sidebar Right */}
      <aside className="sidebar-right">
        <div className="hall-fame-card">
          <h4>Hall of Fame 🏆</h4>
          <p>You are in Top 5% this month!</p>
        </div>
        
        {/* User Quick Info */}
        <div style={{
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '15px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{margin: '0 0 10px 0', fontSize: '14px'}}>Account Info</h4>
          <p style={{fontSize: '12px', color: '#6b7280', margin: '5px 0'}}>
            <strong>Email verified:</strong> {user.emailVerified ? "✅ Yes" : "⚠️ No"}
          </p>
          <p style={{fontSize: '12px', color: '#6b7280', margin: '5px 0'}}>
            <strong>Account created:</strong> {new Date(user.metadata.creationTime).toLocaleDateString()}
          </p>
        </div>
      </aside>
    </div>
  );
};

export default MyProfile;