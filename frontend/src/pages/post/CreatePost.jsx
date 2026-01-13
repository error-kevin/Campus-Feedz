import React, { useState } from 'react'
import './Post.css'

const CreatePost = () => {
  const [category, setCategory] = useState('feed')

  return (
    <div className="upload-container">
      <h1>➕ Create New</h1>
      
      <div className="form-group">
        <label>What do you want to post?</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="feed">Social Post 📸</option>
          <option value="news">Campus News 📢</option>
          <option value="lost">Lost & Found 🔍</option>
          <option value="qa">Ask Question 💡</option>
          <option value="note">Upload Notes 📚</option>
        </select>
      </div>

      <div className="form-group">
        <textarea placeholder="Write a caption, question, or description..." rows="5"></textarea>
      </div>

      <div className="form-group">
        <label>Add Hashtags</label>
        <input type="text" placeholder="#Exam #Fest #Help" />
      </div>

      <div className="upload-box">
        <p>📂 Drag & Drop Image/PDF here</p>
      </div>

      <button className="btn-submit">Post Now</button>
    </div>
  )
}

export default CreatePost