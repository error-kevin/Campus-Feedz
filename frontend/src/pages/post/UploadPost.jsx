import React, { useState } from "react";
import { db } from "../../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { awardXP } from "../../services/gamification"; // Import the gamification service
import "./post.css"; 

const UploadPost = () => {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState(""); 
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!caption || !imageUrl) return alert("Please provide both a caption and an image link!");
    setLoading(true);

    try {
      // 1. Create the Post in Firestore
      await addDoc(collection(db, "posts"), {
        caption,
        imageUrl, 
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        userPoints: user.points || 0, // Stamps current points onto the post
        userRank: user.rank || "Freshman",
        timestamp: serverTimestamp(),
        likes: []
      });

      // 2. Award +10 XP for the activity
      await awardXP(user.uid, 10);

      alert("Post Shared! +10 XP Earned 🚀");
      setCaption("");
      setImageUrl("");
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Error posting to campus. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleUpload} className="upload-card">
        <h2 className="upload-title">Share Campus Update 🎓</h2>
        <p className="upload-subtitle">Use #news for events or #lost for items to help others find your post.</p>
        
        <div className="input-group">
          <label>Image Link</label>
          <input 
            type="text" 
            placeholder="Paste direct image link (e.g. ImgBB)" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="post-input"
          />
        </div>

        <div className="input-group">
          <label>Caption</label>
          <textarea 
            placeholder="What's happening? #news #lost #help" 
            value={caption} 
            onChange={(e) => setCaption(e.target.value)}
            className="post-textarea"
          />
        </div>

        <button type="submit" disabled={loading} className="post-submit-btn">
          {loading ? "Posting..." : "Post to Campus Feed"}
        </button>
      </form>
    </div>
  );
};

export default UploadPost;