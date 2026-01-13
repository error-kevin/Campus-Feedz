import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // 1. Jab tak Firebase check kar raha hai, tab tak wait karo
  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Checking ID Card... ⏳</div>
  }

  // 2. Agar user login NAHI hai, to Login page par bhej do
  if (!user) {
    return <Navigate to="/login" />
  }

  // 3. Agar sab sahi hai, to Page dikhao
  return children
}

export default ProtectedRoute