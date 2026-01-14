import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./feed.css";

const MainFeed = () => {
  // 1. Hook check - Ensure useNavigate is inside Router context
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("social");

  // 2. Data check
  const data = {
    social: [
      { id: 1, user: "Sarah J.", dept: "CS '25", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800", cap: "Hackathon finale! 🏆" }
    ],
    news: [{ id: 1, tag: "EVENT", title: "Tech Fest", desc: "Starting tomorrow!" }],
    lost: [{ id: 1, item: "Bag", loc: "Canteen", time: "1h ago" }]
  };

  return (
    <div className="feed-layout-wrapper">
      <aside className="sidebar-left">
        <h2 className="app-brand">CampusFeedz</h2>
        <nav className="side-menu">
          <div className="menu-item active">🏠 Home</div>
          <div className="menu-item">💡 Q&A</div>
        </nav>
        <button className="create-post-btn" onClick={() => navigate("/upload")}>+ Create Post</button>
      </aside>

      <main className="feed-center-column">
        <div className="feed-tabs-header">
          <button className={activeTab === 'news' ? 'active' : ''} onClick={() => setActiveTab('news')}>News</button>
          <button className={activeTab === 'lost' ? 'active' : ''} onClick={() => setActiveTab('lost')}>Lost</button>
          <button className={activeTab === 'social' ? 'active' : ''} onClick={() => setActiveTab('social')}>Social</button>
        </div>

        <div className="feed-scroll-container">
          {activeTab === 'social' && data.social.map(post => (
            <div key={post.id} className="social-post-card">
              <div className="post-user-bar">
                <div className="u-info"><h4>{post.user}</h4></div>
              </div>
              <img src={post.img} className="main-post-img" alt="post" style={{width: '100%'}} />
              <p style={{padding: '10px'}}><strong>{post.user}</strong> {post.cap}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainFeed;