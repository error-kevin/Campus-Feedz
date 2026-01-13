import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './EditProfile.css' // CSS file import ki

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Form ka data store karne ke liye state
  const [formData, setFormData] = useState({
    branch: 'CSE',
    year: '1st Year',
    collegeId: '',
    bio: ''
  });

  // 2. Jab user kuch likhega to state update hogi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // 3. Save button dabane par kya hoga
  const handleSubmit = (e) => {
    e.preventDefault(); // Page reload hone se rokega
    console.log("Form Data Ready:", formData);
    
    // Abhi sirf dikhane ke liye alert
    alert("Data Ready! Backend connect hote hi ye save ho jayega.\n" + JSON.stringify(formData));
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2 className="edit-title">📝 Complete Your Profile</h2>
        <p className="edit-subtitle">Hi {user?.displayName}, please fill your academic details.</p>
        
        <form onSubmit={handleSubmit} className="edit-form">
          
          {/* Branch Selection */}
          <div className="form-group">
            <label>Branch</label>
            <select name="branch" value={formData.branch} onChange={handleChange} className="form-input">
              <option value="CSE">CSE (Computer Science)</option>
              <option value="AIML">AIML (AI & Machine Learning)</option>
              <option value="IT">IT (Information Tech)</option>
              <option value="EC">EC (Electronics)</option>
              <option value="ME">ME (Mechanical)</option>
              <option value="CE">CE (Civil)</option>
            </select>
          </div>

          {/* Year Selection */}
          <div className="form-group">
            <label>Year</label>
            <select name="year" value={formData.year} onChange={handleChange} className="form-input">
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* College ID */}
          <div className="form-group">
            <label>College ID (Enrollment No.)</label>
            <input 
              type="text" 
              name="collegeId" 
              placeholder="Ex: 0827CS211..." 
              value={formData.collegeId}
              onChange={handleChange}
              className="form-input"
              required 
            />
          </div>

          {/* Bio */}
          <div className="form-group">
            <label>Short Bio</label>
            <textarea 
              name="bio" 
              placeholder="Tell us about yourself..." 
              value={formData.bio}
              onChange={handleChange}
              className="form-input bio-input"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="save-btn">
            💾 Save Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile