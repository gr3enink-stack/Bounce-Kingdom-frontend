import React from 'react';
import { Link } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img 
              src="https://bouncekingdomgh.com/wp-content/uploads/2025/09/Bounce-KingDom-Ghana-1-to-1-ratio-small.png" 
              alt="Bounce Kingdom Ghana"
              className="logo-image"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav hide-mobile">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Our Products</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/safety">Safety & FAQ</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
        
        {/* Desktop Book Button */}
        <Link to="/booking" className="book-now-btn hide-mobile">
          Book Your Adventure
        </Link>
        
        {/* Mobile Navigation */}
        <MobileNavigation />
      </div>
    </header>
  );
};

export default Header;