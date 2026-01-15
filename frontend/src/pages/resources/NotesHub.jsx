import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import './Notes.css';

const NotesHub = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Real-time listener for the "notes" folder in Firestore
    const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Filter notes based on the Search Bar
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-page">
      <header className="notes-hero">
        <h1>📚 Resource Library</h1>
        <p>Handwritten notes, PYQs, and study guides shared by your peers.</p>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search by subject (e.g. TOC, AI, Maths)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
      </header>

      [Image of a responsive CSS grid layout for a web dashboard]
      <div className="notes-grid">
        {filteredNotes.length > 0 ? filteredNotes.map(note => (
          <div key={note.id} className="note-card">
            <div className="note-icon">📄</div>
            <div className="note-info">
              <h3>{note.title}</h3>
              <p className="uploader">Shared by: <span>{note.uploader}</span></p>
              {note.branch && <span className="tag">{note.branch}</span>}
            </div>
            <a 
              href={note.link} 
              target="_blank" 
              rel="noreferrer" 
              className="view-btn"
            >
              Open PDF
            </a>
          </div>
        )) : (
          <div className="no-results">
            <p>No notes found. Be the first to help your juniors!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesHub;