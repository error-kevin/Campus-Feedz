import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import './Profile.css';

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    branch: user?.branch || 'CSE',
    year: user?.year || '1st Year',
    collegeId: user?.collegeId || '',
    bio: user?.bio || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, formData);
      alert("Profile Sync Successful! ✅");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-card edit-mode">
        <h2>📝 Update Profile</h2>
        
        <div className="form-group">
          <label>Academic Branch</label>
          <select value={formData.branch} onChange={(e) => setFormData({...formData, branch: e.target.value})}>
            <option value="CSE">Computer Science (CSE)</option>
            <option value="AIML">AI & Machine Learning</option>
            <option value="IT">Information Tech</option>
            <option value="EC">Electronics (EC)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Current Year</label>
          <select value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})}>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <div className="form-group">
          <label>Enrollment Number</label>
          <input 
            type="text" 
            placeholder="Ex: 0827CS211045" 
            value={formData.collegeId} 
            onChange={(e) => setFormData({...formData, collegeId: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea 
            placeholder="Share your interests or tech stack..." 
            value={formData.bio} 
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          />
        </div>

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Syncing..." : "Save Academic Details"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;