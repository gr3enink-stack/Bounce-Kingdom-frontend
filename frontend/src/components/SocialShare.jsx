import React from 'react';
import './SocialShare.css';

const SocialShare = ({ url, title, description }) => {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
  };

  const handleShare = (platform) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="social-share">
      <h3>Share this party fun!</h3>
      <div className="share-buttons">
        <button 
          className="share-btn facebook" 
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
        >
          <span className="icon">f</span>
        </button>
        <button 
          className="share-btn twitter" 
          onClick={() => handleShare('twitter')}
          aria-label="Share on Twitter"
        >
          <span className="icon">t</span>
        </button>
        <button 
          className="share-btn linkedin" 
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
        >
          <span className="icon">in</span>
        </button>
        <button 
          className="share-btn whatsapp" 
          onClick={() => handleShare('whatsapp')}
          aria-label="Share on WhatsApp"
        >
          <span className="icon">w</span>
        </button>
      </div>
    </div>
  );
};

export default SocialShare;