import React, { useState } from 'react'
import './Feed.css'

const MainFeed = () => {
  const [activeTab, setActiveTab] = useState('social'); // social, news, lostfound

  return (
    <div className="feed-container">
      {/* 3 Section Tabs */}
      <div className="feed-tabs">
        <button className={activeTab === 'social' ? 'active' : ''} onClick={() => setActiveTab('social')}>📱 Feed</button>
        <button className={activeTab === 'news' ? 'active' : ''} onClick={() => setActiveTab('news')}>📢 Campus News</button>
        <button className={activeTab === 'lostfound' ? 'active' : ''} onClick={() => setActiveTab('lostfound')}>🔍 Lost & Found</button>
      </div>

      {/* Content Area */}
      <div className="feed-content">
        {activeTab === 'social' && <h2>📸 Social Feed (Insta Style)</h2>}
        {activeTab === 'news' && <h2>📰 Official Events & Notices</h2>}
        {activeTab === 'lostfound' && <h2>🎒 Lost & Found Items</h2>}
        
        {/* Placeholder Post */}
        <div className="post-card">
          <h4>Rahul Sharma</h4>
          <p>Hackathon starting tomorrow at Room 402! 🚀 #Events</p>
          <div style={{height:'150px', background:'#eee', display:'flex', alignItems:'center', justifyContent:'center'}}>Image Placeholder</div>
        </div>
      </div>
    </div>
  )
}

export default MainFeed