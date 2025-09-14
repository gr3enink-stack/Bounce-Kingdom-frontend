import React from 'react';
import './ResponsiveLayout.css';

const ResponsiveLayout = ({ 
  children, 
  className = '', 
  maxWidth = '1200px',
  padding = '0 2rem',
  ...props 
}) => {
  return (
    <div 
      className={`responsive-layout ${className}`}
      style={{ 
        '--max-width': maxWidth,
        '--padding': padding
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ResponsiveLayout;