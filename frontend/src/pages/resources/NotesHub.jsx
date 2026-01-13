import React from 'react'
import './Notes.css'

const NotesHub = () => {
  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>📚 Resource Library</h1>
        <button className="btn-upload">Upload Notes (+10 pts)</button>
      </div>

      {/* Filter Section */}
      <div className="filters">
        <select><option>Branch (CSE/ME/CE)</option></select>
        <select><option>Year (1st, 2nd, 3rd)</option></select>
        <select><option>Subject</option></select>
        <button>Search</button>
      </div>

      {/* Notes Grid */}
      <div className="notes-grid">
        {/* Note Card 1 */}
        <div className="note-card">
          <div className="note-icon">📄 PDF</div>
          <h3>TOC Handwritten Notes</h3>
          <p>By: Ankit | 3rd Year</p>
          <span className="verified-badge">✅ Verified</span>
          <button>Download</button>
        </div>
        {/* Note Card 2 */}
        <div className="note-card">
          <div className="note-icon">📝 DOC</div>
          <h3>AI Unit 1 Summary</h3>
          <p>By: Sneha | 3rd Year</p>
          <button>Download</button>
        </div>
      </div>
    </div>
  )
}

export default NotesHub