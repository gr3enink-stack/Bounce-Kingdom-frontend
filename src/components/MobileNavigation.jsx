import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileNavigation.css';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="mobile-navigation">
      <button 
        className={`menu-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/products" onClick={closeMenu}>Our Products</Link></li>
          <li><Link to="/how-it-works" onClick={closeMenu}>How It Works</Link></li>
          <li><Link to="/safety" onClick={closeMenu}>Safety & FAQ</Link></li>
          <li><Link to="/testimonials" onClick={closeMenu}>Testimonials</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
          <li><Link to="/booking" className="book-now-mobile" onClick={closeMenu}>Book Your Adventure</Link></li>
        </ul>
      </nav>
      
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </div>
  );
};

export default MobileNavigation;