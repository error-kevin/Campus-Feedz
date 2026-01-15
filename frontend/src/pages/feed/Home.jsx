import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import Leaderboard from "../../components/Leaderboard"; // Import Leaderboard
import "./Home.css"; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("All");
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleLike = async (postId, likes) => {
    const postRef = doc(db, "posts", postId);
    const hasLiked = likes?.includes(user.uid);
    await updateDoc(postRef, { 
      likes: hasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid) 
    });
  };

  const filteredPosts = posts.filter((post) => {
    const caption = post.caption?.toLowerCase() || "";
    if (filter === "All") return true;
    if (filter === "Campus News") return caption.includes("#news");
    if (filter === "Lost & Found") return caption.includes("#lost") || caption.includes("#found");
    if (filter === "General Feed") return !caption.includes("#news") && !caption.includes("#lost") && !caption.includes("#found");
    return true;
  });

  return (
    <div className="home-layout container">
      <div className="main-content">
        <div className="filter-tabs">
          {["All", "General Feed", "Campus News", "Lost & Found"].map((tab) => (
            <button 
              key={tab} 
              className={filter === tab ? "tab active" : "tab"} 
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="feed-container">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <img src={post.userPhoto} alt="avatar" className="avatar" />
                <div className="header-info">
                  <div className="user-name">
                    {post.userName}
                    {/* Show XP next to name */}
                    <span className="xp-badge">{post.userPoints || 0} XP</span>
                  </div>
                  <span className="post-category">
                    {post.caption.includes("#news") ? "📢 News" : 
                     post.caption.includes("#lost") || post.caption.includes("#found") ? "🔍 Lost & Found" : "🏠 General"}
                  </span>
                </div>
              </div>
              <img src={post.imageUrl} alt="post" className="post-image" />
              <div className="post-actions">
                <button onClick={() => handleLike(post.id, post.likes || [])} className="like-btn">
                  {post.likes?.includes(user.uid) ? "❤️" : "🤍"} {post.likes?.length || 0}
                </button>
              </div>
              <div className="post-content">
                <p><strong>{post.userName}</strong> {post.caption}</p>
                <span className="post-date">{post.timestamp?.toDate().toLocaleDateString()}</span>
              </div>
            </div>
          )) : <p className="no-posts">Nothing here yet. Try a different tab!</p>}
        </div>
      </div>

      {/* Sidebar - Desktop Only */}
      <aside className="sidebar">
        <Leaderboard />
      </aside>
    </div>
  );
};

export default Home;