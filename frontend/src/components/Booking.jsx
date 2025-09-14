import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './Toast';
import WeatherWidget from './WeatherWidget';
import Payment from './Payment';
import ResponsiveButton from './ResponsiveButton';
import { getAllProducts } from '../services/productService.js';
import { createBooking } from '../services/bookingService.js';
import { formatCurrency } from '../utils/currency.js';
import './Booking.css';

const Booking = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    product: '',
    date: '',
    time: '',
    duration: '4-hours',
    address: '',
    name: '',
    phone: '',
    email: ''
  });
  const [showPayment, setShowPayment] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getAllProducts();
        // Ensure products have the correct _id field for the select options
        const formattedProducts = productsData.map(product => ({
          ...product,
          _id: product._id || product.id // Use _id if available, otherwise use id
        }));
        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        // Fallback to default data if MongoDB fetch fails
        const defaultProducts = [
          { _id: 1, productId: 1, name: "The Pirate Ship Bounce House" },
          { _id: 2, productId: 2, name: "Tropical Thunder Water Slide" },
          { _id: 3, productId: 3, name: "Rainbow Balloon Pit" },
          { _id: 4, productId: 4, name: "Castle Adventure Combo" }
        ];
        setProducts(defaultProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const durations = [
    { id: '4-hours', name: '4 Hours', price: 600 },
    { id: '8-hours', name: '8 Hours', price: 1000 },
    { id: 'full-day', name: 'Full Day (12 Hours)', price: 1500 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePaymentSuccess = async () => {
    setShowPayment(false);
    
    // Save booking to MongoDB
    try {
      console.log('Products available:', products);
      console.log('Selected product ID:', bookingData.product);
      
      // Find the selected product using the correct ID field
      const selectedProduct = products.find(p => 
        p._id == bookingData.product || p.id == bookingData.product
      );
      console.log('Selected product object:', selectedProduct);
      
      const selectedDuration = durations.find(d => d.id === bookingData.duration);
      console.log('Selected duration:', selectedDuration);
      
      // Ensure date is properly formatted
      const bookingDate = new Date(bookingData.date);
      if (isNaN(bookingDate.getTime())) {
        throw new Error('Invalid date format');
      }
      
      const bookingToSave = {
        bookingId: `BK-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0')}`,
        customer: {
          name: bookingData.name,
          phone: bookingData.phone,
          email: bookingData.email
        },
        product: {
          id: selectedProduct?.productId || selectedProduct?._id || selectedProduct?.id,
          name: selectedProduct?.name
        },
        date: bookingDate,
        time: bookingData.time,
        duration: selectedDuration,
        address: bookingData.address,
        status: 'Confirmed',
        totalAmount: selectedDuration.price
      };
      
      console.log('Attempting to save booking:', bookingToSave);
      const savedBooking = await createBooking(bookingToSave);
      console.log('Booking saved successfully:', savedBooking);
      addToast('Payment successful! Your booking is confirmed.', 'success');
      // Navigate to confirmation page
      navigate('/confirmation');
    } catch (err) {
      console.error('Error saving booking:', err);
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      
      // More detailed error message
      let errorMessage = 'Booking confirmed but failed to save to database';
      if (err.message) {
        errorMessage += ': ' + err.message;
      }
      
      addToast(errorMessage, 'error');
      // Still navigate to confirmation page even if save fails
      // But let's add a more informative message
      setTimeout(() => {
        addToast('Please contact support with your booking details.', 'info');
      }, 3000);
      navigate('/confirmation');
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDuration = durations.find(d => d.id === bookingData.duration);
    setSelectedAmount(selectedDuration.price);
    setShowPayment(true);
  };

  if (loading) {
    return <div className="booking">Loading products...</div>;
  }

  if (error) {
    return <div className="booking">Error: {error}</div>;
  }

  return (
    <section className="booking" id="booking">
      <div className="section-header">
        <h2>Book Your Adventure</h2>
        <p>Easy 3-step booking process</p>
      </div>
      
      <div className="booking-container">
        {/* Progress Bar */}
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Choose</div>
          </div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Details</div>
          </div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Confirm</div>
          </div>
        </div>
        
        {/* Step 1: Choose Product and Date */}
        {step === 1 && (
          <div className="booking-step">
            <h3>Select Product & Date</h3>
            <form>
              <div className="form-section">
                <h4 className="form-section-title">Product Selection</h4>
                <div className="form-group">
                  <label htmlFor="product">Choose a Product</label>
                  <select
                    id="product"
                    name="product"
                    value={bookingData.product}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a product</option>
                    {products.map(product => (
                      <option key={product._id || product.id} value={product._id || product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="date">Select Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="weather-widget-container">
                  <WeatherWidget />
                </div>
              </div>
              
              {/* Check Availability Button - Moved inside form-section for proper containment */}
              <div className="form-group">
                <ResponsiveButton 
                  className="next-btn" 
                  onClick={nextStep} 
                  disabled={!bookingData.product || !bookingData.date}
                >
                  Check Availability
                </ResponsiveButton>
              </div>
            </form>
          </div>
        )}
        
        {/* Step 2: Enter Details */}
        {step === 2 && (
          <div className="booking-step">
            <h3>Delivery Details</h3>
            <form>
              <div className="form-section">
                <h4 className="form-section-title">Event Details</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="time">Preferred Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={bookingData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <select
                      id="duration"
                      name="duration"
                      value={bookingData.duration}
                      onChange={handleInputChange}
                      required
                    >
                      {durations.map(duration => (
                        <option key={duration.id} value={duration.id}>{duration.name} - {formatCurrency(duration.price)}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h4 className="form-section-title">Delivery Information</h4>
                <div className="form-group">
                  <label htmlFor="address">Delivery Address</label>
                  <textarea
                    id="address"
                    name="address"
                    placeholder="Enter your full address"
                    rows="3"
                    value={bookingData.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="form-navigation">
                <ResponsiveButton 
                  className="prev-btn" 
                  onClick={prevStep}
                  variant="outline"
                >
                  Back
                </ResponsiveButton>
                <ResponsiveButton 
                  className="next-btn" 
                  onClick={nextStep} 
                  disabled={!bookingData.time || !bookingData.address}
                >
                  Continue
                </ResponsiveButton>
              </div>
            </form>
          </div>
        )}
        
        {/* Step 3: Confirm and Pay */}
        {step === 3 && (
          <div className="booking-step">
            <h3>Confirm Booking</h3>
            <div className="booking-summary">
              <div className="summary-section">
                <h4>Product</h4>
                <p>{products.find(p => p._id == bookingData.product)?.name}</p>
              </div>
              
              <div className="summary-section">
                <h4>Date & Time</h4>
                <p>{bookingData.date} at {bookingData.time}</p>
              </div>
              
              <div className="summary-section">
                <h4>Duration</h4>
                <p>{durations.find(d => d.id === bookingData.duration)?.name}</p>
              </div>
              
              <div className="summary-section">
                <h4>Delivery Address</h4>
                <p>{bookingData.address}</p>
              </div>
              
              <div className="summary-section">
                <h4>Price</h4>
                <p>{formatCurrency(durations.find(d => d.id === bookingData.duration)?.price)}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h4 className="form-section-title">Contact Information</h4>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-navigation">
                <ResponsiveButton 
                  className="prev-btn" 
                  onClick={prevStep}
                  variant="outline"
                >
                  Back
                </ResponsiveButton>
                <ResponsiveButton 
                  type="submit" 
                  className="submit-btn"
                >
                  Proceed to Payment
                </ResponsiveButton>
              </div>
            </form>
          </div>
        )}
      </div>
      
      {/* Payment Modal */}
      {showPayment && (
        <Payment 
          amount={selectedAmount}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentCancel={handlePaymentCancel}
        />
      )}
    </section>
  );
};

export default Booking;