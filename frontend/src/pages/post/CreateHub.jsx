import React, { useState } from 'react';
import UploadPost from './UploadPost';
import { db } from '../../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
// import './CreateHub.css';

const CreateHub = () => {
  const [activeTab, setActiveTab] = useState('post');
  const { user } = useAuth();

  // Shared state for Q&A and Notes
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleCreateQA = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "questions"), {
      question: title,
      userId: user.uid,
      userName: user.displayName,
      timestamp: serverTimestamp(),
      votes: 0,
      answers: []
    });
    alert("Question posted to Q&A Hub! 💡");
    setTitle("");
  };

  return (
    <div className="create-hub-container">
      <div className="tab-switcher">
        <button onClick={() => setActiveTab('post')} className={activeTab === 'post' ? 'active' : ''}>📸 Post</button>
        <button onClick={() => setActiveTab('qa')} className={activeTab === 'qa' ? 'active' : ''}>❓ Question</button>
        <button onClick={() => setActiveTab('notes')} className={activeTab === 'notes' ? 'active' : ''}>📚 Notes</button>
      </div>

      <div className="create-form-area">
        {activeTab === 'post' && <UploadPost />}
        
        {activeTab === 'qa' && (
          <form onSubmit={handleCreateQA} className="simple-form">
            <h3>Ask the Campus</h3>
            <textarea placeholder="What is your question?" value={title} onChange={(e)=>setTitle(e.target.value)} required />
            <button type="submit" className="btn-primary">Post Question</button>
          </form>
        )}

        {activeTab === 'notes' && (
          <div className="simple-form">
            <h3>Share Study Material</h3>
            <p>Upload your PDF to Google Drive and paste the 'Anyone with link' URL below.</p>
            <input type="text" placeholder="Subject Name" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <input type="text" placeholder="Drive Link" value={link} onChange={(e)=>setLink(e.target.value)} />
            <button onClick={async () => {
              await addDoc(collection(db, "notes"), { title, link, uploader: user.displayName, uploaderPoints: user.points || 0, timestamp: serverTimestamp() });
              alert("Notes shared! XP updated.");
            }} className="btn-primary">Share Notes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateHub;