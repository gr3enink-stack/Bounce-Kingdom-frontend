import React from 'react';
import FAQAccordion from './FAQAccordion';
import './SafetyFAQ.css';

const SafetyFAQ = () => {
  const categories = [
    {
      name: 'Safety',
      questions: [
        {
          question: "What safety measures do you have in place?",
          answer: "All our equipment is regularly inspected and cleaned according to strict safety standards. Our team is trained in proper setup and safety protocols. We provide safety instructions with every rental and ensure all equipment meets industry safety requirements."
        },
        {
          question: "Do you have insurance?",
          answer: "Yes, we carry comprehensive liability insurance to protect both our business and our customers. Certificates of insurance are available upon request."
        },
        {
          question: "How do you clean the equipment?",
          answer: "We follow a rigorous 3-step cleaning process: vacuuming, sanitizing with child-safe disinfectants, and air-drying. Each piece is thoroughly cleaned between every rental to ensure hygiene and safety."
        }
      ]
    },
    {
      name: 'Booking',
      questions: [
        {
          question: "How far in advance should I book?",
          answer: "We recommend booking at least 2 weeks in advance for weekends and holidays, especially during peak seasons. For last-minute bookings, contact us directly as we may have availability."
        },
        {
          question: "What is your cancellation policy?",
          answer: "Cancellations made more than 7 days before the event receive a full refund. Cancellations within 7 days are eligible for a 50% refund. No-shows are not eligible for refunds."
        },
        {
          question: "Do you offer delivery and setup?",
          answer: "Yes! Our professional team handles all delivery, setup, and takedown of your rented equipment. We arrive early to ensure everything is ready for your event and return to collect everything when you're done."
        }
      ]
    },
    {
      name: 'General',
      questions: [
        {
          question: "What if it rains on the day of my event?",
          answer: "We recommend booking on a date with favorable weather forecasts. In case of light rain, our equipment can still be used safely. For heavy rain or storms, we offer rescheduling options to ensure everyone's safety."
        },
        {
          question: "What surfaces do you need for setup?",
          answer: "We can set up on grass, concrete, or asphalt surfaces. For grass, we use stakes to secure the equipment. For hard surfaces, we use weights. We cannot set up on rocky, uneven, or wet surfaces for safety reasons."
        },
        {
          question: "What are your operating hours?",
          answer: "We operate Monday through Saturday from 9am to 6pm. For events outside these hours, please contact us directly to discuss availability and any additional fees."
        }
      ]
    }
  ];

  return (
    <section className="safety-faq" id="safety">
      <div className="section-header">
        <h2>Safety & FAQ</h2>
        <p>Your peace of mind is our priority</p>
      </div>
      
      <div className="faq-container">
        <FAQAccordion categories={categories} />
      </div>
    </section>
  );
};

export default SafetyFAQ;