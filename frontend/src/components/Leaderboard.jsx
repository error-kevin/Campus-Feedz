// src/components/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    // Query: Get top 5 users by points
    const q = query(collection(db, "users"), orderBy("points", "desc"), limit(5));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTopUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="leaderboard-card" style={{
      background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #ddd', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ borderBottom: '2px solid #2563eb', paddingBottom: '10px', color: '#1f2937' }}>🏆 Hall of Fame</h3>
      <div className="leaderboard-list" style={{ marginTop: '15px' }}>
        {topUsers.map((u, index) => (
          <div key={u.id} className="leaderboard-item" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: index === topUsers.length -1 ? 'none' : '1px solid #f0f0f0'
          }}>
            <span style={{ fontWeight: 'bold', width: '25px' }}>
              {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
            </span>
            <img src={u.photoURL} alt="avatar" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem' }}>{u.displayName}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#2563eb', fontWeight: 'bold' }}>{u.points || 0} XP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;