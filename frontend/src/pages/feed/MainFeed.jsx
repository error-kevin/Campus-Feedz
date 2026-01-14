import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ADD THIS
import "./Feed.css";

const MainFeed = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ADD THIS
  const [activeTab, setActiveTab] = useState("social");

  // Backend check - Console me user data print hoga
  useEffect(() => {
    if (user) {
      console.log("✅ USER AUTHENTICATED IN BACKEND!");
      console.log("📧 Email:", user.email);
      console.log("🆔 User ID:", user.uid);
      console.log("👤 Name:", user.displayName);
      console.log("Full User Object:", user);
    }
  }, [user]);

  const data = {
    social: [
      { 
        id: 1, 
        user: user?.displayName || "Anonymous", // Use logged-in user's name
        dept: "CS '25", 
        img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800", 
        cap: "Hackathon finale! 🏆",
        userPhoto: user?.photoURL // Use logged-in user's photo
      }
    ],
    news: [
      { id: 1, tag: "EVENT", title: "Tech Fest", desc: "Starting tomorrow!" }
    ],
    lost: [
      { id: 1, item: "Bag", loc: "Canteen", time: "1h ago" }
    ]
  };

  return (
    <div className="feed-layout-wrapper">
      <aside className="sidebar-left">
        <h2 className="app-brand">CampusFeedz</h2>
        
        {/* Show logged-in user info */}
        {user && (
          <div style={{
            padding: '15px',
            background: '#f3f4f6',
            borderRadius: '8px',
            margin: '10px 0',
            textAlign: 'center'
          }}>
            <img 
              src={user.photoURL} 
              alt="profile" 
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                marginBottom: '8px'
              }}
            />
            <p style={{
              fontSize: '12px',
              color: '#1f2937',
              fontWeight: 'bold',
              margin: '5px 0'
            }}>
              {user.displayName}
            </p>
            <p style={{
              fontSize: '10px',
              color: '#6b7280',
              margin: 0
            }}>
              {user.email}
            </p>
            <p style={{
              fontSize: '10px',
              color: '#10b981',
              marginTop: '8px',
              fontWeight: 'bold'
            }}>
              ✅ Logged In
            </p>
          </div>
        )}

        <nav className="side-menu">
          <div className="menu-item active">🏠 Home</div>
          <div className="menu-item" onClick={() => navigate("/qa")}>💡 Q&A</div>
          <div className="menu-item" onClick={() => navigate("/resources")}>📚 Notes</div>
          <div className="menu-item" onClick={() => navigate("/profile")}>👤 Profile</div>
        </nav>
        <button className="create-post-btn" onClick={() => navigate("/upload")}>
          + Create Post
        </button>
      </aside>

      <main className="feed-center-column">
        <div className="feed-tabs-header">
          <button 
            className={activeTab === 'news' ? 'active' : ''} 
            onClick={() => setActiveTab('news')}
          >
            📰 News
          </button>
          <button 
            className={activeTab === 'lost' ? 'active' : ''} 
            onClick={() => setActiveTab('lost')}
          >
            🔍 Lost & Found
          </button>
          <button 
            className={activeTab === 'social' ? 'active' : ''} 
            onClick={() => setActiveTab('social')}
          >
            📱 Social
          </button>
        </div>

        <div className="feed-scroll-container">
          {activeTab === 'social' && data.social.map(post => (
            <div key={post.id} className="social-post-card">
              <div className="post-user-bar">
                <div className="u-info">
                  <img 
                    src={post.userPhoto} 
                    alt="user"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      marginRight: '10px'
                    }}
                  />
                  <div>
                    <h4 style={{margin: 0}}>{post.user}</h4>
                    <p style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {post.dept}
                    </p>
                  </div>
                </div>
              </div>
              <img 
                src={post.img} 
                className="main-post-img" 
                alt="post" 
                style={{width: '100%'}} 
              />
              <p style={{padding: '10px'}}>
                <strong>{post.user}</strong> {post.cap}
              </p>
            </div>
          ))}

          {activeTab === 'news' && data.news.map(item => (
            <div key={item.id} className="news-card" style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '15px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <span style={{
                background: '#3b82f6',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {item.tag}
              </span>
              <h3 style={{marginTop: '10px'}}>{item.title}</h3>
              <p style={{color: '#6b7280'}}>{item.desc}</p>
            </div>
          ))}

          {activeTab === 'lost' && data.lost.map(item => (
            <div key={item.id} className="lost-card" style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '15px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3>🔍 Lost: {item.item}</h3>
              <p>📍 Location: {item.loc}</p>
              <p style={{color: '#6b7280', fontSize: '12px'}}>⏰ {item.time}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainFeed;