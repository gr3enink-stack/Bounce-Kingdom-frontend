import React, { useState } from 'react';
import { useToast } from './Toast';
import ResponsiveButton from './ResponsiveButton';
import './Contact.css';

const Contact = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    addToast('Thank you for your message! We will get back to you soon.', 'success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="section-header">
        <h2>Contact Us</h2>
        <p>Get in touch for bookings, questions, or party planning advice</p>
      </div>
      
      <div className="contact-container">
        <div className="contact-info">
          <h3>Let's Plan Your Party!</h3>
          <p>Have questions or ready to book your adventure? Reach out to us!</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <h4>📍 Address</h4>
              <p>Accra, Ghana</p>
            </div>
            
            <div className="contact-item">
              <h4>📞 Phone</h4>
              <p>+233 123 456 789</p>
            </div>
            
            <div className="contact-item">
              <h4>✉️ Email</h4>
              <p>info@bouncekingdomghana.com</p>
            </div>
            
            <div className="contact-item">
              <h4>🕒 Business Hours</h4>
              <p>Monday - Friday: 9am - 6pm</p>
              <p>Saturday: 10am - 4pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
        
        <div className="contact-form">
          <h3>Send us a message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <ResponsiveButton 
              type="submit" 
              className="submit-btn"
              fullWidth
            >
              Send Message
            </ResponsiveButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;