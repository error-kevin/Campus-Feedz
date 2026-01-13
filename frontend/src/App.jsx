import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
// Home page abhi dummy rakhte hain
const Home = () => <div className="container"><h1>🏠 Home Feed</h1></div>

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App