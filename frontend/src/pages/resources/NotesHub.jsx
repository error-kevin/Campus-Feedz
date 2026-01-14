import React, { useState } from "react";
import "./NotesHub.css";

const NotesHub = () => {
  const [filter, setFilter] = useState("All");

  const notes = [
    { id: 1, title: "Data Structures - Unit 1", author: "Rahul V.", upvotes: 45, branch: "CS", year: "2nd" },
    { id: 2, title: "Thermodynamics Basics", author: "Sneha K.", upvotes: 30, branch: "ME", year: "1st" },
    { id: 3, title: "Microprocessors PDF", author: "Amit S.", upvotes: 89, branch: "EC", year: "3rd" },
  ];

  return (
    <div className="notes-container">
      {/* Search & Filter Header */}
      <div className="notes-header">
        <h1>Resource Library 📚</h1>
        <p>Verified notes to ace your exams.</p>
        <div className="search-bar-ui">
          <input type="text" placeholder="Search subject, course, or topic..." />
        </div>
      </div>

      <div className="notes-main-layout">
        {/* Left: Filters */}
        <aside className="notes-filters">
          <h4>Filter by Branch</h4>
          <button className={filter === "CS" ? "active" : ""} onClick={() => setFilter("CS")}>Computer Science</button>
          <button className={filter === "ME" ? "active" : ""} onClick={() => setFilter("ME")}>Mechanical</button>
          <button className={filter === "EC" ? "active" : ""} onClick={() => setFilter("EC")}>Electronics</button>
          <button className="upload-notes-btn">📤 Upload Your Notes</button>
        </aside>

        {/* Middle: Notes List */}
        <main className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-card-ui">
              <div className="note-icon">📄</div>
              <div className="note-details">
                <h3>{note.title}</h3>
                <p>By {note.author} • {note.branch} ({note.year} Year)</p>
                <div className="note-footer">
                  <span className="upvote-count">🔼 {note.upvotes} Upvotes</span>
                  <button className="download-btn">View PDF</button>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* Right: Contributor Leaderboard (Requirement #5) */}
        <aside className="notes-leaderboard">
          <h4>Top Contributors 🏆</h4>
          <div className="contributor-rank">
            <span>🥇 Amit Sharma</span>
            <small>85 Upvotes received</small>
          </div>
          <div className="contributor-rank">
            <span>🥈 Rahul Varma</span>
            <small>62 Upvotes received</small>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NotesHub;