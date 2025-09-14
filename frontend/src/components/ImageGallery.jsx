import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const openFullscreen = (index) => {
    setCurrentIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const handleFullscreenKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeFullscreen();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  };

  return (
    <div className="image-gallery">
      {/* Main image */}
      <div className="main-image-container">
        <img 
          src={images[currentIndex]} 
          alt={`Product view ${currentIndex + 1}`} 
          className="main-image"
          onClick={() => openFullscreen(currentIndex)}
        />
        <button className="fullscreen-btn" onClick={() => openFullscreen(currentIndex)}>
          🔍
        </button>
      </div>
      
      {/* Thumbnail images */}
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      
      {/* Fullscreen modal */}
      {isFullscreen && (
        <div 
          className="fullscreen-modal"
          onClick={closeFullscreen}
          onKeyDown={handleFullscreenKeyDown}
          tabIndex={0}
        >
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeFullscreen}>×</button>
            <button className="nav-btn prev" onClick={prevImage}>‹</button>
            <img 
              src={images[currentIndex]} 
              alt={`Product view ${currentIndex + 1}`} 
              className="fullscreen-image"
            />
            <button className="nav-btn next" onClick={nextImage}>›</button>
            <div className="image-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;