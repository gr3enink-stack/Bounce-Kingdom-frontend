import React from 'react';
import './ResponsiveButton.css';

const ResponsiveButton = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  ...props 
}) => {
  return (
    <button 
      className={`responsive-button ${className} ${variant} ${size} ${fullWidth ? 'full-width' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ResponsiveButton;