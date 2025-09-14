import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="cookie-consent">
      <div className="consent-content">
        <p>
          We use cookies to enhance your experience on our website. By continuing to browse, 
          you agree to our use of cookies as described in our{' '}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
        </p>
        <div className="consent-buttons">
          <button className="accept-btn" onClick={acceptCookies}>
            Accept All
          </button>
          <button className="reject-btn" onClick={rejectCookies}>
            Reject Non-Essential
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;