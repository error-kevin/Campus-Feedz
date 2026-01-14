import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute' 
import EditProfile from './pages/profile/EditProfile'

// Pages
import Login from './pages/auth/Login'
import MainFeed from './pages/feed/MainFeed'
import QAHub from './pages/qa/QAHub'
import NotesHub from './pages/resources/NotesHub'
import CreatePost from './pages/post/CreatePost'
import MyProfile from './pages/profile/MyProfile'
import UploadPost from './pages/upload/UploadPost'

// Conditional Navbar Component
function ConditionalNavbar() {
  const location = useLocation();
  
  if (location.pathname === '/login') {
    return null;
  }
  
  return <Navbar />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ConditionalNavbar />
        <div className="main-app-content">
          <Routes>
            
            {/* 🔓 PUBLIC ROUTE */}
            <Route path="/login" element={<Login />} />

            {/* 🔒 PRIVATE ROUTES */}
            <Route path="/" element={
              <ProtectedRoute><MainFeed /></ProtectedRoute>
            } />
            
            <Route path="/qa" element={
              <ProtectedRoute><QAHub /></ProtectedRoute>
            } />
            
            <Route path="/resources" element={
              <ProtectedRoute><NotesHub /></ProtectedRoute>
            } />
            
            <Route path="/create" element={
              <ProtectedRoute><CreatePost /></ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute><MyProfile /></ProtectedRoute>
            } />

            <Route path="/edit-profile" element={
              <ProtectedRoute><EditProfile /></ProtectedRoute>
            } />

            <Route path="/upload" element={
              <ProtectedRoute><UploadPost /></ProtectedRoute>
            } />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App