// API functions for browser environment
const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : '/api');

// Import authService to get token for authentication
import { isAuthenticated } from './authService.js';

// Mock data for fallback in development only
const mockProducts = [
  {
    _id: '1',
    productId: 1,
    name: "The Pirate Ship Bounce House",
    description: "Ahoy mateys! Set sail for adventure with our pirate-themed bounce house complete with slides and climbing areas.",
    image: "/images/pirate-ship.jpg",
    category: "Bounce House",
    status: "Available",
    lastMaintenance: new Date().toISOString()
  },
  {
    _id: '2',
    productId: 2,
    name: "Tropical Thunder Water Slide",
    description: "Cool off with our tropical-themed water slide that will make a splash at any party!",
    image: "/images/water-slide.jpg",
    category: "Water Slide",
    status: "In Use",
    lastMaintenance: new Date().toISOString()
  },
  {
    _id: '3',
    productId: 3,
    name: "Rainbow Balloon Pit",
    description: "Dive into a sea of colorful balloons in our magical rainbow balloon pit.",
    image: "/images/balloon-pit.jpg",
    category: "Balloon Pit",
    status: "Available",
    lastMaintenance: new Date().toISOString()
  },
  {
    _id: '4',
    productId: 4,
    name: "Castle Adventure Combo",
    description: "Our most popular combo unit with a bounce area, slide, and climbing wall.",
    image: "/images/castle-combo.jpg",
    category: "Combo Unit",
    status: "Maintenance",
    lastMaintenance: new Date().toISOString()
  }
];

// Utility function to implement request timeout
const fetchWithTimeout = (url, options = {}, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

// Helper function to get authentication headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token && isAuthenticated()) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Helper function to determine if we should use mock data (only in development)
const shouldUseMockData = () => {
  // Only use mock data in development environment when API calls fail
  return !import.meta.env.PROD;
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    console.log('Creating product with data:', productData);
    
    const response = await fetchWithTimeout(`${apiBaseUrl}/api/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    }, 10000); // 10 second timeout
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (parseError) {
        // If parsing fails, use the raw text
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to create product`);
    }
    
    const savedProduct = await response.json();
    return savedProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.message === 'Request timeout') {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again later.');
    }
    throw new Error(`Error creating product: ${error.message}`);
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    console.log('Making API call to get all products');
    
    const response = await fetchWithTimeout(`${apiBaseUrl}/api/products`, {
      method: 'GET',
      headers: getAuthHeaders()
    }, 10000); // 10 second timeout
    
    if (!response.ok) {
      // In production, don't fall back to mock data, throw an error instead
      if (import.meta.env.PROD) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      
      // In development, fallback to mock data if API call fails
      console.log('API call failed, returning mock products');
      return mockProducts;
    }
    
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // In production, don't fall back to mock data, throw an error instead
    if (import.meta.env.PROD) {
      if (error.message === 'Request timeout') {
        throw new Error('Request timeout: The server is taking too long to respond. Please try again later.');
      }
      throw new Error(`Error fetching products: ${error.message}`);
    }
    
    // In development, fallback to mock data if API call fails
    console.log('API call failed, returning mock products');
    if (error.message === 'Request timeout') {
      console.log('Request timeout occurred, returning mock products');
    }
    return mockProducts;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    console.log('Making API call to get product by ID:', id);
    
    const response = await fetchWithTimeout(`${apiBaseUrl}/api/products/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    }, 10000); // 10 second timeout
    
    if (!response.ok) {
      // In production, don't fall back to mock data, throw an error instead
      if (import.meta.env.PROD) {
        throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
      }
      
      // In development, fallback to mock data if API call fails
      console.log('API call failed, returning mock product by ID');
      const product = mockProducts.find(p => p._id === id || p.productId === parseInt(id));
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }
    
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    
    // In production, don't fall back to mock data, throw an error instead
    if (import.meta.env.PROD) {
      if (error.message === 'Request timeout') {
        throw new Error('Request timeout: The server is taking too long to respond. Please try again later.');
      }
      throw new Error(`Error fetching product: ${error.message}`);
    }
    
    // In development, fallback to mock data if API call fails
    console.log('API call failed, returning mock product by ID');
    if (error.message === 'Request timeout') {
      console.log('Request timeout occurred, returning mock product');
    }
    const product = mockProducts.find(p => p._id === id || p.productId === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
};

// Update product
export const updateProduct = async (id, updateData) => {
  try {
    console.log('Updating product with data:', updateData);
    console.log('Product ID:', id);
    
    // Check if image data is too large
    if (updateData.image && updateData.image.length > 8000000) { // 8MB limit
      throw new Error('Image is too large. Please use an image smaller than 8MB.');
    }
    
    const response = await fetchWithTimeout(`${apiBaseUrl}/api/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    }, 15000); // 15 second timeout for updates (might take longer)
    
    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (parseError) {
        // If parsing fails, use the raw text
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to update product`);
    }
    
    const product = await response.json();
    console.log('Product updated successfully:', product);
    return product;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    if (error.message === 'Request timeout') {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again later.');
    }
    throw new Error(`Error updating product: ${error.message}`);
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    console.log('Deleting product with ID:', id);
    
    const response = await fetchWithTimeout(`${apiBaseUrl}/api/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    }, 10000); // 10 second timeout
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete product');
    }
    
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    if (error.message === 'Request timeout') {
      throw new Error('Request timeout: The server is taking too long to respond. Please try again later.');
    }
    throw new Error(`Error deleting product: ${error.message}`);
  }
};