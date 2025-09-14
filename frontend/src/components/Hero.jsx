import React from 'react';
import CountdownTimer from './CountdownTimer';
import ResponsiveButton from './ResponsiveButton';
import ResponsiveLayout from './ResponsiveLayout';
import './Hero.css';

const Hero = () => {
  // Set a future date for the special offer (e.g., end of the month)
  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 10); // 10 days from now

  return (
    <section className="hero">
      {/* Animated stars */}
      <div className="stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      
      {/* Animated balloons */}
      <div className="balloon balloon-1"></div>
      <div className="balloon balloon-2"></div>
      <div className="balloon balloon-3"></div>
      <div className="balloon balloon-4"></div>
      
      <ResponsiveLayout className="hero-content">
        <h1>Making Your Celebration Extraordinary!</h1>
        <p>Experience the magic of our inflatable bounce houses, water slides, and party equipment that will create unforgettable memories for your children.</p>
        <CountdownTimer 
          targetDate={offerEndDate} 
          title="Special Weekend Offer - 20% Off All Bookings!" 
        />
        <ResponsiveButton className="cta-button" size="large">
          Book Your Adventure
        </ResponsiveButton>
      </ResponsiveLayout>
      <div className="hero-image">
        <img 
          src="https://bouncekingdomgh.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-10-at-7.09.23-AM.jpeg" 
          alt="Kids playing in a bounce house"
          className="hero-image-content"
        />
      </div>
    </section>
  );
};

export default Hero;