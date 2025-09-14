import React from 'react';
import './ResponsiveImage.css';

const ResponsiveImage = ({ 
  src, 
  alt, 
  className = '', 
  lazy = true,
  width,
  height,
  ...props 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`responsive-image ${className}`}
      loading={lazy ? "lazy" : "eager"}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default ResponsiveImage;