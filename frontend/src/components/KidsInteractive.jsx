import React, { useState } from 'react';
import PartyQuiz from './PartyQuiz';
import ResponsiveButton from './ResponsiveButton';
import './KidsInteractive.css';

const KidsInteractive = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [colors] = useState([
    '#ff6b6b', // Red
    '#4ecdc4', // Teal
    '#ffd166', // Yellow
    '#6a0572', // Purple
    '#118ab2', // Blue
    '#06d6a0'  // Green
  ]);
  
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const changeColor = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  if (showQuiz) {
    return <PartyQuiz />;
  }

  return (
    <section className="kids-interactive">
      <div className="section-header">
        <h2>Fun Activities for Kids!</h2>
        <p>Tap the bounce house to change colors or take our party style quiz!</p>
      </div>
      
      <div className="interactive-container">
        <div className="tap-instruction">👆 Tap the bounce house to change colors!</div>
        <div 
          className="bounce-house"
          style={{ backgroundColor: colors[currentColorIndex] }}
          onClick={changeColor}
          aria-label="Tap to change bounce house color"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              changeColor();
            }
          }}
        >
          <div className="bounce-house-top"></div>
          <div className="bounce-house-body">
            <div className="window"></div>
            <div className="door"></div>
          </div>
          <div className="bounce-house-slide"></div>
        </div>
        
        <div className="color-palette">
          {colors.map((color, index) => (
            <div 
              key={index}
              className={`color-option ${index === currentColorIndex ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setCurrentColorIndex(index)}
            ></div>
          ))}
        </div>
        
        <div className="interactive-buttons">
          <ResponsiveButton 
            className="party-style-btn" 
            onClick={changeColor}
            fullWidth
          >
            Change Colors!
          </ResponsiveButton>
          <ResponsiveButton 
            className="quiz-btn" 
            onClick={() => setShowQuiz(true)}
            fullWidth
          >
            What's Your Party Style? 🎉
          </ResponsiveButton>
        </div>
      </div>
    </section>
  );
};

export default KidsInteractive;