import React from 'react';
import ResponsiveGrid from './ResponsiveGrid';
import ResponsiveCard from './ResponsiveCard';
import './HowItWorks.css';

const steps = [
  {
    id: 1,
    title: "Browse & Choose",
    description: "Explore our collection of bounce houses, water slides, and party equipment to find the perfect fit for your celebration.",
    icon: "🔍" // In a real implementation, this would be an actual icon
  },
  {
    id: 2,
    title: "Check Date & Book",
    description: "Select your preferred date and time using our easy booking calendar. We'll confirm availability instantly!",
    icon: "📅"
  },
  {
    id: 3,
    title: "We Deliver & Setup",
    description: "Our professional team will deliver and set up all equipment at your location, ensuring everything is safe and ready.",
    icon: "🚚"
  },
  {
    id: 4,
    title: "You Play & Make Memories!",
    description: "Enjoy your party while we handle all the fun! We'll return to clean up and collect everything when you're done.",
    icon: "🎉"
  }
];

const HowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <h2>How It Works</h2>
        <p>Planning your party has never been easier!</p>
      </div>
      
      <div className="steps-container">
        {steps.map(step => (
          <ResponsiveCard key={step.id} className="step" hoverable>
            <div className="responsive-card-content">
              <div className="step-icon">
                <span className="icon">{step.icon}</span>
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          </ResponsiveCard>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;