import React, { useState } from 'react';
import { useToast } from './Toast';
import './Newsletter.css';

const Newsletter = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Thank you for subscribing to our newsletter!', 'success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <h2>Join the Party!</h2>
        <p>Subscribe to our newsletter for special offers, new products, and party planning tips.</p>
        
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        <p className="privacy-note">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;