import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";

const MyProfile = () => {
  const navigate = useNavigate();

  const user = {
    name: "Alex Rivera",
    dept: "Biology Major, Class of 2026",
    points: 850,
    rank: "Campus Mentor",
    badges: ["Top Contributor", "Helpful Senior", "Verified Solver"],
  };

  return (
    <div className="feed-layout-wrapper"> {/* Same wrapper as MainFeed */}
      
      {/* 1. Sidebar Left (Navigation intact rakha hai) */}
      <aside className="sidebar-left">
        <h2 className="app-brand">CampusFeedz</h2>
        <nav className="side-menu">
          <div className="menu-item" onClick={() => navigate("/")}>🏠 Home</div>
          <div className="menu-item">🔍 Discover</div>
          <div className="menu-item" onClick={() => navigate("/resources")}>📚 Resources</div>
          <div className="menu-item" onClick={() => navigate("/qa")}>💡 Q&A</div>
          <div className="menu-item active">👤 Profile</div>
        </nav>
        <button className="create-post-btn" onClick={() => navigate("/upload")}>+ Create Post</button>
      </aside>

      {/* 2. Center Profile Section (Aapki inspiration ke jaisa) */}
      <main className="feed-center-column">
        <div className="profile-scroll-box">
          <div className="profile-banner">
            <div className="profile-avatar-container">
              <img src="https://i.pravatar.cc/150?u=alex" alt="Alex" />
            </div>
          </div>

          <div className="profile-details-main">
            <h1>{user.name}</h1>
            <p>{user.dept}</p>
            
            <div className="profile-stats-grid">
              <div className="p-stat"><strong>{user.points}</strong><span>Points</span></div>
              <div className="p-stat"><strong>{user.rank}</strong><span>Rank</span></div>
            </div>

            <div className="badge-container-ui">
              <h4>Achievements & Badges 🏆</h4>
              <div className="badges-flex">
                {user.badges.map((b, i) => (
                  <span key={i} className="badge-item-ui">⭐ {b}</span>
                ))}
              </div>
            </div>

            <div className="profile-tabs-ui">
              <button className="active">My Posts</button>
              <button>My Answers</button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Sidebar Right (Empty or Stats) */}
      <aside className="sidebar-right">
        <div className="hall-fame-card">
          <h4>Hall of Fame 🏆</h4>
          <p>You are in Top 5% this month!</p>
        </div>
      </aside>
    </div>
  );
};

export default MyProfile;