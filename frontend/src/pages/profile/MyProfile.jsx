import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom' // 👈 1. Ye Import Zaroori hai

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '10px', 
        padding: '20px', 
        textAlign: 'center',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        {/* Profile Pic */}
        <img 
          src={user?.photoURL || "https://via.placeholder.com/150"} 
          alt="Profile" 
          style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px', objectFit: 'cover' }}
        />
        
        {/* Name & Email */}
        <h2 style={{margin: '5px 0', color: '#333'}}>{user?.displayName || "Guest User"}</h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>{user?.email}</p>

        {/* ⬇️ 2. Edit Profile Button Yahan Add Kiya Hai */}
        <div style={{ margin: '15px 0' }}>
          <Link to="/edit-profile" style={{
            textDecoration: 'none',
            backgroundColor: '#2563EB', // Blue Color
            color: 'white',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            ✏️ Edit Profile
          </Link>
        </div>

        <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

        {/* Academic Details (Abhi ye Static hain, backend judne par real honge) */}
        <div style={{ textAlign: 'left', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <p style={{margin: '8px 0'}}><strong>🆔 ID:</strong> 0827CS211045</p>
          <p style={{margin: '8px 0'}}><strong>🎓 Branch:</strong> CSE</p>
          <p style={{margin: '8px 0'}}><strong>📅 Year:</strong> 3rd Year</p>
        </div>
      </div>
    </div>
  )
}

export default MyProfile