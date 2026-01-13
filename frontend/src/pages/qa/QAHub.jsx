import React from 'react'
import './QA.css'

const QAHub = () => {
  return (
    <div className="qa-layout">
      
      {/* Left: Questions Feed */}
      <div className="qa-main">
        <h1>💡 Mentorship & Q/A</h1>
        <div className="ask-box">
           <input type="text" placeholder="Ask anonymously or as yourself..." />
           <div className="ask-options">
             <label><input type="checkbox" /> Ask Anonymously 🕶️</label>
             <button className="btn-ask">Ask Question</button>
           </div>
        </div>

        {/* Question Card */}
        <div className="qa-card">
          <div className="vote-section">
            <button>⬆️</button> <span>12</span> <button>⬇️</button>
          </div>
          <div className="qa-content">
            <h3>How to prepare for MSTs in 3rd Year?</h3>
            <span className="tag">CSE</span> <span className="tag">Exams</span>
            <p>Can someone share important topics for AI subject?</p>
            <div className="qa-footer">12 Answers • AI Generated Suggestion Available ✨</div>
          </div>
        </div>
      </div>

      {/* Right: Hall of Fame (Gamification) */}
      <div className="qa-sidebar">
        <h3>🏆 Hall of Fame</h3>
        <ul className="leaderboard">
          <li>🥇 Priya (1500 pts)</li>
          <li>🥈 Amit (1200 pts)</li>
          <li>🥉 Keshav (900 pts)</li>
        </ul>
        <div className="ai-badge">🤖 AI Helper Ready</div>
      </div>
    </div>
  )
}

export default QAHub