import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currency.js';
import './Confirmation.css';

const Confirmation = () => {
  return (
    <div className="confirmation">
      <div className="confirmation-content">
        <div className="confirmation-icon">🎉</div>
        <h1>Booking Confirmed!</h1>
        <p>Thank you for choosing Bounce Kingdom Ghana! Your party rental has been successfully booked.</p>
        
        <div className="confirmation-details">
          <h2>Booking Details</h2>
          <div className="detail-item">
            <span className="label">Booking ID:</span>
            <span className="value">BK-2025-001234</span>
          </div>
          <div className="detail-item">
            <span className="label">Product:</span>
            <span className="value">The Pirate Ship Bounce House</span>
          </div>
          <div className="detail-item">
            <span className="label">Date & Time:</span>
            <span className="value">September 15, 2025 at 10:00 AM</span>
          </div>
          <div className="detail-item">
            <span className="label">Duration:</span>
            <span className="value">4 Hours</span>
          </div>
          <div className="detail-item">
            <span className="label">Total Amount:</span>
            <span className="value">{formatCurrency(600)}</span>
          </div>
        </div>
        
        <div className="confirmation-actions">
          <Link to="/" className="home-btn">
            Back to Home
          </Link>
          <Link to="/contact" className="contact-btn">
            Contact Us
          </Link>
        </div>
        
        <div className="confirmation-footer">
          <p>A confirmation email has been sent to your email address.</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;