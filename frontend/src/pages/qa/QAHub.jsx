import React, { useState } from "react";
import "./QAHub.css";

const QAHub = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <div className="qa-layout">
      {/* 1. Header with Stats */}
      <header className="qa-header">
        <div className="qa-info">
          <h1>Campus Q&A Hub</h1>
          <p>Get guidance from seniors & AI 💡</p>
        </div>
        <div className="user-rank-card">
          <span>Your Rank: <strong>Campus Mentor</strong></span>
          <span className="pts">⭐ 450 Pts</span>
        </div>
      </header>

      {/* 2. Ask Question Box */}
      <div className="ask-box">
        <textarea placeholder="What is your question? (Ask seniors or AI)" />
        <div className="ask-actions">
          <label className="anon-toggle">
            <input 
              type="checkbox" 
              checked={isAnonymous} 
              onChange={() => setIsAnonymous(!isAnonymous)} 
            />
            <span>Ask Anonymously</span>
          </label>
          <button className="ask-btn">Post Question</button>
        </div>
      </div>

      {/* 3. Question Feed */}
      <div className="qa-feed">
        <div className="question-card">
          <div className="q-meta">
            <span className="q-author">Anonymous • 2h ago</span>
            <span className="q-tag">#Career</span>
          </div>
          <h3>Is it worth joining the Robotics Club in 1st year?</h3>
          <div className="q-stats">
            <span>🔼 12 Upvotes</span>
            <span>💬 5 Answers</span>
          </div>
          
          {/* Sample Top Answer */}
          <div className="top-answer">
            <p><strong>Senior Alex:</strong> Definitely! You'll get hands-on experience that classes don't provide...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAHub;