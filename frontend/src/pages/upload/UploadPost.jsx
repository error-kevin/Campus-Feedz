import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./upload.css";

const UploadPost = () => {
  const [postType, setPostType] = useState("social");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Image preview handle karne ke liye
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box-card">
        <div className="upload-nav">
          <button onClick={() => navigate(-1)}>✕</button>
          <h3>New Post</h3>
          <button className="post-trigger-btn">Share</button>
        </div>

        {/* Category Selector */}
        <div className="type-toggle">
          <button className={postType === 'social' ? 'active' : ''} onClick={() => setPostType('social')}>Social</button>
          <button className={postType === 'news' ? 'active' : ''} onClick={() => setPostType('news')}>News</button>
          <button className={postType === 'lost' ? 'active' : ''} onClick={() => setPostType('lost')}>Lost</button>
        </div>

        <div className="upload-content">
          {/* Image Upload Area */}
          <div className="media-selector">
            {preview ? (
              <img src={preview} alt="preview" className="img-preview" />
            ) : (
              <label className="upload-label">
                <input type="file" onChange={handleImageChange} hidden />
                <span>📸 Tap to add photo</span>
              </label>
            )}
          </div>

          {/* Dynamic Inputs based on type */}
          <div className="input-section">
            <textarea placeholder="Write a caption... Use #hashtags" rows="4"></textarea>
            
            {postType === 'news' && (
              <input type="text" placeholder="Event Title / Headline" className="extra-field" />
            )}
            
            {postType === 'lost' && (
              <input type="text" placeholder="Found/Lost Location? (e.g. Canteen)" className="extra-field" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPost;