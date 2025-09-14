import React from 'react';
import { formatCurrency } from '../utils/currency.js';
import './Payment.css';

const Payment = ({ amount, onPaymentSuccess, onPaymentCancel }) => {
  const handlePayment = (method) => {
    // In a real application, you would integrate with a payment gateway
    alert(`Processing payment of ${formatCurrency(amount)} via ${method}...`);
    // Simulate payment success
    setTimeout(() => {
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="payment-modal">
      <div className="payment-content">
        <h2>Secure Payment</h2>
        <p>Amount: <strong>{formatCurrency(amount)}</strong></p>
        
        <div className="payment-methods">
          <button className="payment-method" onClick={() => handlePayment('Credit Card')}>
            <div className="method-icon">💳</div>
            <span>Credit Card</span>
          </button>
          
          <button className="payment-method" onClick={() => handlePayment('Mobile Money')}>
            <div className="method-icon">📱</div>
            <span>Mobile Money</span>
          </button>
          
          <button className="payment-method" onClick={() => handlePayment('Bank Transfer')}>
            <div className="method-icon">🏦</div>
            <span>Bank Transfer</span>
          </button>
        </div>
        
        <div className="payment-actions">
          <button className="cancel-btn" onClick={onPaymentCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;