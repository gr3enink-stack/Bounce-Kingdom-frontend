import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import SocialShare from './SocialShare';
import ResponsiveButton from './ResponsiveButton';
import ResponsiveGrid from './ResponsiveGrid';
import { getProductById } from '../services/productService.js';
import { formatCurrency } from '../utils/currency.js';
import './ProductDetail.css';

// Function to display product images
const ProductImage = ({ product, isLarge = false, isThumbnail = false }) => {
  // Handle image loading error
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    
    // Create placeholder element
    const placeholder = document.createElement('div');
    placeholder.className = `placeholder-image ${isLarge ? 'large' : isThumbnail ? 'thumbnail' : 'small'}`;
    placeholder.style.backgroundColor = '#f0f0f0';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.borderRadius = '10px';
    placeholder.style.color = '#666';
    placeholder.style.fontWeight = 'bold';
    
    if (isLarge) {
      placeholder.style.height = '400px';
      placeholder.style.fontSize = '18px';
    } else if (isThumbnail) {
      placeholder.style.height = '100px';
      placeholder.style.fontSize = '12px';
    } else {
      placeholder.style.height = '100px';
      placeholder.style.fontSize = '10px';
    }
    
    placeholder.innerHTML = 'Image not available';
    e.target.parentNode.appendChild(placeholder);
  };

  return (
    <div className={`product-image-container ${isLarge ? 'large' : isThumbnail ? 'thumbnail' : 'small'}`}>
      <img 
        src={product.image} 
        alt={product.name} 
        onError={handleImageError}
        style={{
          width: '100%',
          height: isLarge ? '400px' : isThumbnail ? '100px' : '100px',
          objectFit: 'cover',
          borderRadius: '10px',
          display: 'block'
        }}
      />
    </div>
  );
};

const ProductDetail = ({ product, onBack }) => {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState('');
  const [currentProduct, setCurrentProduct] = useState(product);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch product data from MongoDB when component mounts or product ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      if (product._id) {
        try {
          setLoading(true);
          const fetchedProduct = await getProductById(product._id);
          if (fetchedProduct) {
            setCurrentProduct(fetchedProduct);
          }
          setError(null);
        } catch (err) {
          console.error('Error fetching product:', err);
          setError('Failed to load product details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [product._id]);

  const durations = [
    { id: '4-hours', name: '4 Hours', price: formatCurrency(600) },
    { id: '8-hours', name: '8 Hours', price: formatCurrency(1000) },
    { id: 'full-day', name: 'Full Day (12 Hours)', price: formatCurrency(1500) }
  ];

  const shareUrl = `${window.location.origin}/products/${currentProduct._id}`;
  const shareTitle = `Check out ${currentProduct.name} at Bounce Kingdom Ghana!`;
  const shareDescription = currentProduct.description;

  const handleAddToCart = () => {
    if (!selectedDuration) {
      alert('Please select a duration before adding to cart.');
      return;
    }
    // In a real application, this would add the product to a cart state
    alert(`Added ${currentProduct.name} (${selectedDuration.name}) to cart!`);
  };

  const handleCheckAvailability = () => {
    // In a real application, this would check with a backend service
    // For now, we'll simulate a response
    setAvailabilityChecked(true);
    setAvailabilityResult('Available for your selected dates! Book now to secure your reservation.');
  };

  if (loading) {
    return <div className="product-detail">Loading product details...</div>;
  }

  if (error) {
    return <div className="product-detail">Error: {error}</div>;
  }

  return (
    <div className="product-detail">
      <ResponsiveButton 
        className="back-btn" 
        onClick={onBack}
        variant="outline"
      >
        ← Back to Products
      </ResponsiveButton>
      
      <div className="product-detail-content">
        <div className="product-image-gallery">
          <div className="main-image">
            <ProductImage product={currentProduct} isLarge />
          </div>
          <div className="thumbnail-images">
            <ProductImage product={currentProduct} isThumbnail />
            <ProductImage product={currentProduct} isThumbnail />
            <ProductImage product={currentProduct} isThumbnail />
          </div>
        </div>
        
        <div className="product-info">
          <h1>{currentProduct.name}</h1>
          <p className="product-description">{currentProduct.description}</p>
          
          <div className="product-specs">
            <div className="spec">
              <h3>Dimensions</h3>
              <p>{currentProduct.specs?.dimensions || 'N/A'}</p>
            </div>
            <div className="spec">
              <h3>Age Group</h3>
              <p>{currentProduct.specs?.ageGroup || 'N/A'}</p>
            </div>
            <div className="spec">
              <h3>Capacity</h3>
              <p>{currentProduct.specs?.capacity || 'N/A'}</p>
            </div>
          </div>
          
          <div className="pricing-options">
            <h3>Pricing Options</h3>
            <ResponsiveGrid columns={3} className="pricing-cards" gap="1rem">
              {durations.map(duration => (
                <div 
                  className={`pricing-card ${selectedDuration && selectedDuration.id === duration.id ? 'selected' : ''}`} 
                  key={duration.id}
                  onClick={() => setSelectedDuration(duration)}
                >
                  <h4>{duration.name}</h4>
                  <p className="price">{duration.price}</p>
                  <ResponsiveButton 
                    className="add-to-cart-btn"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDuration(duration);
                      handleAddToCart();
                    }}
                  >
                    Add to Cart
                  </ResponsiveButton>
                </div>
              ))}
            </ResponsiveGrid>
          </div>
          
          <ResponsiveButton 
            className="check-availability-btn"
            fullWidth
            onClick={handleCheckAvailability}
          >
            Check Availability
          </ResponsiveButton>
          
          {availabilityChecked && (
            <div className="availability-result">
              <p>{availabilityResult}</p>
            </div>
          )}
          
          <SocialShare 
            url={shareUrl} 
            title={shareTitle} 
            description={shareDescription} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;