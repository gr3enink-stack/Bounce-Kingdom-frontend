import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate, title }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Use localStorage to persist the target date
    const STORAGE_KEY = 'countdownTargetDate';
    let persistentTargetDate = targetDate;

    // Check if we have a saved target date in localStorage
    const savedTargetDate = localStorage.getItem(STORAGE_KEY);
    
    if (savedTargetDate) {
      const savedDate = new Date(savedTargetDate);
      // Only use the saved date if it's in the future
      if (savedDate > new Date()) {
        persistentTargetDate = savedDate;
      } else {
        // If saved date is in the past, save the new target date
        localStorage.setItem(STORAGE_KEY, targetDate.toString());
      }
    } else {
      // No saved date, save the current target date
      localStorage.setItem(STORAGE_KEY, targetDate.toString());
    }

    const calculateTimeLeft = () => {
      const difference = new Date(persistentTargetDate) - new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-timer">
      <h3>{title}</h3>
      <div className="timer-container">
        <div className="time-unit">
          <span className="time-value">{timeLeft.days}</span>
          <span className="time-label">Days</span>
        </div>
        <div className="time-separator">:</div>
        <div className="time-unit">
          <span className="time-value">{timeLeft.hours}</span>
          <span className="time-label">Hours</span>
        </div>
        <div className="time-separator">:</div>
        <div className="time-unit">
          <span className="time-value">{timeLeft.minutes}</span>
          <span className="time-label">Minutes</span>
        </div>
        <div className="time-separator">:</div>
        <div className="time-unit">
          <span className="time-value">{timeLeft.seconds}</span>
          <span className="time-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;