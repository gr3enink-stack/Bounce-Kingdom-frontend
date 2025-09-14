import React, { useState, useEffect } from 'react';
import ProductDetail from './ProductDetail';
import ProductSearch from './ProductSearch';
import ResponsiveGrid from './ResponsiveGrid';
import ResponsiveCard from './ResponsiveCard';
import ResponsiveButton from './ResponsiveButton';
import { getAllProducts } from '../services/productService.js';
import './Products.css';

// Function to display product images
const ProductImage = ({ product }) => {
  // Handle both base64 data URLs and regular image paths
  const getImageSrc = (image) => {
    if (!image) return '/images/placeholder.jpg';
    
    // If it's already a data URL, use it directly
    if (typeof image === 'string' && image.startsWith('data:image')) {
      return image;
    }
    
    // Otherwise, assume it's a path
    return image;
  };

  return (
    <div className="product-image">
      <img 
        src={getImageSrc(product.image)} 
        alt={product.name} 
        onError={(e) => {
          // Fallback to placeholder if image doesn't load
          e.target.style.display = 'none';
          const placeholder = document.createElement('div');
          placeholder.className = 'placeholder-image';
          placeholder.style.backgroundColor = '#f0f0f0';
          placeholder.style.height = '200px';
          placeholder.style.display = 'flex';
          placeholder.style.alignItems = 'center';
          placeholder.style.justifyContent = 'center';
          placeholder.style.borderRadius = '10px';
          placeholder.innerHTML = 'Image not available';
          e.target.parentNode.appendChild(placeholder);
        }}
      />
    </div>
  );
};

// Function to display product specifications
const ProductSpecs = ({ product }) => {
  // Format additional specifications as a list
  const renderAdditionalSpecs = (specsText) => {
    if (!specsText) return null;
    
    const specsArray = specsText.split('\n').filter(spec => spec.trim() !== '');
    return (
      <ul className="additional-specs-list">
        {specsArray.map((spec, index) => {
          // Clean the spec by removing any existing bullet points and trimming
          const cleanSpec = spec.trim().replace(/^•\s*/, '');
          return <li key={index}>{cleanSpec}</li>;
        })}
      </ul>
    );
  };

  return (
    <div className="product-specs">
      <div className="basic-specs">
        <span className="spec"><strong>Size:</strong> {product.specs?.dimensions || 'N/A'}</span>
        <span className="spec"><strong>Age:</strong> {product.specs?.ageGroup || 'N/A'}</span>
        <span className="spec"><strong>Capacity:</strong> {product.specs?.capacity || 'N/A'}</span>
      </div>
      {product.additionalSpecs && (
        <div className="additional-specs">
          <h4>Additional Features:</h4>
          {renderAdditionalSpecs(product.additionalSpecs)}
        </div>
      )}
    </div>
  );
};

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from MongoDB...');
        setLoading(true);
        const products = await getAllProducts();
        console.log('Products fetched:', products);
        setFilteredProducts(products);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products: ' + err.message);
        // Fallback to default data if MongoDB fetch fails
        const defaultProducts = [
          {
            _id: 1,
            productId: 1,
            name: "The Pirate Ship Bounce House",
            description: "Ahoy mateys! Set sail for adventure with our pirate-themed bounce house complete with slides and climbing areas.",
            image: "/images/pirate-ship.jpg",
            specs: {
              dimensions: "15' x 15'",
              ageGroup: "3-10 years",
              capacity: "8-10 kids"
            },
            additionalSpecs: "• Various sizes available\n• Safety nets included\n• Colorful designs\n• Age-appropriate options"
          },
          {
            _id: 2,
            productId: 2,
            name: "Tropical Thunder Water Slide",
            description: "Cool off with our tropical-themed water slide that will make a splash at any party!",
            image: "/images/water-slide.jpg",
            specs: {
              dimensions: "20' x 10'",
              ageGroup: "5-12 years",
              capacity: "4-6 kids"
            },
            additionalSpecs: "• Various sizes available\n• Safety nets included\n• Colorful designs\n• Age-appropriate options"
          },
          {
            _id: 3,
            productId: 3,
            name: "Rainbow Balloon Pit",
            description: "Dive into a sea of colorful balloons in our magical rainbow balloon pit.",
            image: "/images/balloon-pit.jpg",
            specs: {
              dimensions: "12' x 12'",
              ageGroup: "2-8 years",
              capacity: "6-8 kids"
            },
            additionalSpecs: "• Various sizes available\n• Safety nets included\n• Colorful designs\n• Age-appropriate options"
          },
          {
            _id: 4,
            productId: 4,
            name: "Castle Adventure Combo",
            description: "Our most popular combo unit with a bounce area, slide, and climbing wall.",
            image: "/images/castle-combo.jpg",
            specs: {
              dimensions: "18' x 18'",
              ageGroup: "3-12 years",
              capacity: "10-12 kids"
            },
            additionalSpecs: "• Various sizes available\n• Safety nets included\n• Colorful designs\n• Age-appropriate options"
          }
        ];
        setFilteredProducts(defaultProducts);
      } finally {
        console.log('Finished loading products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLearnMore = (product) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  if (loading) {
    return <div className="products">Loading products...</div>;
  }

  if (error) {
    return <div className="products">Error: {error}</div>;
  }

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <section className="products" id="products">
      <div className="section-header">
        <h2>Our Magical Products</h2>
        <p>Explore our collection of fun-filled party equipment</p>
      </div>
      
      <ProductSearch products={filteredProducts} onProductSelect={handleProductSelect} />
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ResponsiveCard key={product._id} className="product-card" hoverable>
            <ProductImage product={product} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <ProductSpecs product={product} />
              <ResponsiveButton 
                className="learn-more-btn" 
                onClick={() => handleLearnMore(product)}
                fullWidth
              >
                Learn More / Book
              </ResponsiveButton>
            </div>
          </ResponsiveCard>
        ))}
      </div>
    </section>
  );
};

export default Products;