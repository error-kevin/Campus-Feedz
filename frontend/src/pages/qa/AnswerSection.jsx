import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { awardXP } from '../../services/gamification';

const AnswerSection = ({ questionId }) => {
  const [answers, setAnswers] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Answers are stored in a sub-collection inside each question
    const q = query(
      collection(db, "questions", questionId, "answers"), 
      orderBy("timestamp", "asc")
    );
    return onSnapshot(q, (snapshot) => {
      setAnswers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, [questionId]);

  const postReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      // 1. Add answer to sub-collection
      await addDoc(collection(db, "questions", questionId, "answers"), {
        text: replyText,
        userName: user.displayName,
        userPhoto: user.photoURL,
        timestamp: serverTimestamp()
      });

      // 2. Increment global reply count for the question
      await updateDoc(doc(db, "questions", questionId), {
        replyCount: increment(1)
      });

      // 3. Award Points for helping!
      await awardXP(user.uid, 15);

      setReplyText("");
      alert("Reply posted! +15 XP earned 🏆");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="answer-section">
      <button 
        className="toggle-replies" 
        onClick={() => setShowReplies(!showReplies)}
      >
        💬 {answers.length} Replies
      </button>

      {showReplies && (
        <div className="replies-container">
          <div className="replies-list">
            {answers.map(ans => (
              <div key={ans.id} className="reply-item">
                <img src={ans.userPhoto} alt="user" className="avatar-tiny" />
                <div className="reply-content">
                  <strong>{ans.userName}</strong>
                  <p>{ans.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={postReply} className="reply-form">
            <input 
              type="text" 
              placeholder="Write a helpful reply..." 
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button type="submit">Reply</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AnswerSection;