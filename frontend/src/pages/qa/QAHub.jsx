import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { awardXP } from '../../services/gamification';
import AnswerSection from './AnswerSection';
import Leaderboard from '../../components/Leaderboard';
import axios from 'axios';
import './QA.css';

const QAHub = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);
  const { user } = useAuth();
  
  const API_URL = 'https://17db5ac86433.ngrok-free.app';

  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("timestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
      setQuestions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    try {
      await addDoc(collection(db, "questions"), {
        question: newQuestion,
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        timestamp: serverTimestamp(),
        replyCount: 0
      });
      setNewQuestion("");
      await awardXP(user.uid, 5); // Small reward for asking
    } catch (err) {
      console.error(err);
    }
  };

  const getAiHelp = async (qText) => {
    setLoadingAi(true);
    setAiResponse("AI Mentor is typing... 🤖");
    try {
      const res = await axios.post(
        `${API_URL}/api/ask-ai`, 
        { question: qText },
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      setAiResponse(res.data.ai_answer);
    } catch (err) {
      setAiResponse("AI Mentor is currently offline. Reach out to a peer! 🛑");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="qa-layout container">
      <div className="qa-main">
        <header className="qa-header">
          <h1>💡 Campus Q&A Hub</h1>
          <form onSubmit={handleAsk} className="ask-box">
            <textarea 
              placeholder="What's on your mind? (e.g., 'How to setup Docker?')" 
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <button type="submit">Ask Community</button>
          </form>
        </header>

        {aiResponse && (
          <div className="ai-mentor-box">
            <div className="ai-tag">🤖 AI MENTOR SUGGESTION</div>
            <p>{aiResponse}</p>
            <button onClick={() => setAiResponse("")} className="close-ai">×</button>
          </div>
        )}

        <div className="questions-list">
          {questions.map(q => (
            <div key={q.id} className="question-card">
              <div className="q-user-info">
                <img src={q.userPhoto} alt="user" className="avatar-small" />
                <span>{q.userName} shared a question</span>
              </div>
              <h3>{q.question}</h3>
              <div className="q-actions">
                <button onClick={() => getAiHelp(q.question)} className="btn-ai-small">✨ AI Help</button>
              </div>
              
              {/* This is the new Reply Component */}
              <AnswerSection questionId={q.id} />
            </div>
          ))}
        </div>
      </div>

      <aside className="sidebar">
        <Leaderboard />
      </aside>
    </div>
  );
};

export default QAHub;