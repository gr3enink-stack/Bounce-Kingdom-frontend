import React, { useState } from 'react';
import './AvailabilityChecker.css';

const AvailabilityChecker = ({ product, date, onCheckAvailability }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [availability, setAvailability] = useState(null);

  const checkAvailability = () => {
    setIsChecking(true);
    
    // Simulate API call to check availability
    setTimeout(() => {
      // Randomly determine availability (in a real app, this would come from a backend)
      const isAvailable = Math.random() > 0.3;
      setAvailability(isAvailable);
      setIsChecking(false);
      
      if (onCheckAvailability) {
        onCheckAvailability(isAvailable);
      }
    }, 1500);
  };

  return (
    <div className="availability-checker">
      <h3>Check Availability</h3>
      <div className="availability-info">
        <p><strong>Product:</strong> {product}</p>
        <p><strong>Date:</strong> {date}</p>
      </div>
      
      {availability === null && !isChecking && (
        <button className="check-btn" onClick={checkAvailability}>
          Check Availability
        </button>
      )}
      
      {isChecking && (
        <div className="checking">
          <div className="spinner"></div>
          <p>Checking availability...</p>
        </div>
      )}
      
      {availability !== null && !isChecking && (
        <div className={`result ${availability ? 'available' : 'unavailable'}`}>
          {availability ? (
            <>
              <div className="status-icon">✅</div>
              <h4>Available!</h4>
              <p>This product is available for your selected date.</p>
              <button className="book-btn" onClick={() => onCheckAvailability && onCheckAvailability(true)}>
                Book Now
              </button>
            </>
          ) : (
            <>
              <div className="status-icon">❌</div>
              <h4>Not Available</h4>
              <p>Sorry, this product is already booked for your selected date.</p>
              <button className="try-again-btn" onClick={() => setAvailability(null)}>
                Try Another Date
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilityChecker;