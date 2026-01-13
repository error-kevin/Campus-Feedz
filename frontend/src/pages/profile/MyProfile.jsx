import React from 'react'
import { useAuth } from '../../context/AuthContext'
// Agar Profile.css file nahi banayi hai to niche wali line hata dena error de sakti hai
// import './Profile.css' 

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '10px', 
        padding: '20px', 
        textAlign: 'center',
        backgroundColor: 'white'
      }}>
        {/* Profile Pic */}
        <img 
          src={user?.photoURL || "https://via.placeholder.com/150"} 
          alt="Profile" 
          style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
        />
        
        {/* Name & Email */}
        <h2>{user?.displayName || "Guest User"}</h2>
        <p style={{ color: '#666' }}>{user?.email}</p>

        <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

        {/* Academic Details */}
        <div style={{ textAlign: 'left' }}>
          <p><strong>🆔 ID:</strong> 0827CS211045</p>
          <p><strong>🎓 Branch:</strong> CSE</p>
          <p><strong>📅 Year:</strong> 3rd Year</p>
        </div>
      </div>
    </div>
  )
}

// ⬇️ YE LINE SABSE ZAROORI HAI ⬇️
export default MyProfile