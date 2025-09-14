import React from 'react';
import './ResponsiveCard.css';

const ResponsiveCard = ({ 
  children, 
  className = '', 
  elevated = false, 
  hoverable = true, 
  ...props 
}) => {
  return (
    <div 
      className={`responsive-card ${className} ${elevated ? 'elevated' : ''} ${hoverable ? 'hoverable' : ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ResponsiveCard;