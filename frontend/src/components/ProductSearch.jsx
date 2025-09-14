import React, { useState } from 'react';
import './ProductSearch.css';

const ProductSearch = ({ products, onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (term.length === 0) {
      setFilteredProducts([]);
      return;
    }
    
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredProducts(filtered);
  };

  const handleProductClick = (product) => {
    setSearchTerm('');
    setFilteredProducts([]);
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  return (
    <div className="product-search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
        <button className="search-btn">🔍</button>
      </div>
      
      {filteredProducts.length > 0 && (
        <div className="search-results">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="search-result-item"
              onClick={() => handleProductClick(product)}
            >
              <div className="result-image">
                <div className="placeholder-image">
                  <span>{product.name.charAt(0)}</span>
                </div>
              </div>
              <div className="result-info">
                <h4>{product.name}</h4>
                <p>{product.description.substring(0, 60)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;