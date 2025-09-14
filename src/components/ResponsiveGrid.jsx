import React from 'react';
import './ResponsiveGrid.css';

const ResponsiveGrid = ({ 
  children, 
  columns = 1, 
  gap = '1rem', 
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`responsive-grid ${className}`}
      style={{ 
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;