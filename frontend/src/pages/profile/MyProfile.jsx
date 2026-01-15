import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './Profile.css';

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Header Section */}
        <div className="profile-header">
          <div className="avatar-wrapper">
            <img 
              src={user?.photoURL || "https://via.placeholder.com/150"} 
              alt="Profile" 
              className="profile-pic"
            />
            {/* Real-time Rank Badge based on XP */}
            <span className="rank-badge">{user?.rank || "Freshman"}</span>
          </div>
          <h2 className="user-name">{user?.displayName}</h2>
          <p className="user-email">{user?.email}</p>
          <Link to="/edit-profile" className="edit-btn-link">✏️ Edit Profile</Link>
        </div>

        {/* Stats Section (XP Only) */}
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-value">{user?.points || 0}</span>
            <span className="stat-label">Total XP Earned</span>
          </div>
        </div>

        {/* Academic Details Section */}
        <div className="details-section">
          <h3>🎓 Academic Details</h3>
          <div className="detail-item">
            <strong>Enrollment:</strong> <span>{user?.collegeId || "Not Set"}</span>
          </div>
          <div className="detail-item">
            <strong>Branch:</strong> <span>{user?.branch || "Not Set"}</span>
          </div>
          <div className="detail-item">
            <strong>Current Year:</strong> <span>{user?.year || "Not Set"}</span>
          </div>
          <div className="detail-item">
            <strong>Bio:</strong> 
            <p className="bio-text">{user?.bio || "No bio added yet. Tell the campus about yourself!"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;