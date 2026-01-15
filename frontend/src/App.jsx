import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages & Components
import Login from "./pages/auth/Login";
import Home from "./pages/feed/Home";
import CreateHub from "./pages/post/CreateHub"; // Updated: Combined Create Page
import QAHub from "./pages/qa/QAHub"; 
import NotesHub from "./pages/resources/NotesHub"; // New: Resources Page
import MyProfile from "./pages/profile/MyProfile"; 
import EditProfile from "./pages/profile/EditProfile"; // New: Profile Editing
import Navbar from "./components/Navbar";

// Global Styles
import './styles/global.css';

/**
 * ProtectedRoute Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar /> 
          
          <main className="content container">
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login />} />

              {/* Private Campus Routes */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/create" 
                element={
                  <ProtectedRoute>
                    <CreateHub />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/qa" 
                element={
                  <ProtectedRoute>
                    <QAHub />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/resources" 
                element={
                  <ProtectedRoute>
                    <NotesHub />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/edit-profile" 
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all Redirect */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;