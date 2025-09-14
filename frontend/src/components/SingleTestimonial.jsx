import React from 'react';
import './SingleTestimonial.css';

const SingleTestimonial = ({ testimonial }) => {
  return (
    <div className="single-testimonial">
      <div className="review-text">
        <p>"{testimonial.text}"</p>
      </div>
      <div className="review-author">
        <div className="author-avatar">
          <span>{testimonial.name ? testimonial.name.charAt(0) : '?'}</span>
        </div>
        <div className="author-info">
          <h4>{testimonial.name}</h4>
          <p>{testimonial.location}</p>
        </div>
      </div>
      <div className="review-rating">
        {'★'.repeat(testimonial.rating || 0)}
        {'☆'.repeat(5 - (testimonial.rating || 0))}
      </div>
    </div>
  );
};

export default SingleTestimonial;