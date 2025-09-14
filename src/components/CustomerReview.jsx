import React, { useState, useEffect } from 'react';
import './CustomerReview.css';

const CustomerReview = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="customer-review">
      <div className="review-content">
        <div className="review-text">
          <p>"{reviews[currentIndex].text}"</p>
        </div>
        <div className="review-author">
          <div className="author-avatar">
            <span>{reviews[currentIndex].name.charAt(0)}</span>
          </div>
          <div className="author-info">
            <h4>{reviews[currentIndex].name}</h4>
            <p>{reviews[currentIndex].location}</p>
          </div>
        </div>
        <div className="review-rating">
          {'★'.repeat(reviews[currentIndex].rating)}
          {'☆'.repeat(5 - reviews[currentIndex].rating)}
        </div>
      </div>
      
      <div className="review-navigation">
        <button className="nav-btn prev" onClick={prevReview}>‹</button>
        <div className="review-indicators">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToReview(index)}
            />
          ))}
        </div>
        <button className="nav-btn next" onClick={nextReview}>›</button>
      </div>
    </div>
  );
};

export default CustomerReview;