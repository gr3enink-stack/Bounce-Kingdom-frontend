import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <img 
              src="https://bouncekingdomgh.com/wp-content/uploads/2025/09/Bounce-KingDom-Ghana-1-to-1-ratio-small.png" 
              alt="Bounce Kingdom Ghana"
              className="footer-logo-image"
            />
            <h3 className="footer-logo-text">Bounce Kingdom Ghana</h3>
          </div>
          <p className="footer-description">Making Your Celebration Extraordinary!</p>
          <p className="footer-description">Providing safe, clean, and fun party equipment for unforgettable memories.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Our Products</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#safety">Safety & FAQ</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📍 Accra, Ghana</p>
          <p>📞 +233 123 456 789</p>
          <p>✉️ info@bouncekingdomghana.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bounce Kingdom Ghana. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;