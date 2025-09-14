import React, { useState } from 'react';
import './FAQAccordion.css';

const FAQAccordion = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState({});

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setActiveQuestion(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="faq-accordion">
      <div className="faq-categories">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-btn ${activeCategory === index ? 'active' : ''}`}
            onClick={() => setActiveCategory(index)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="faq-questions">
        {categories[activeCategory].questions.map((faq, index) => {
          const key = `${activeCategory}-${index}`;
          const isOpen = activeQuestion[key];
          
          return (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${isOpen ? 'active' : ''}`}
                onClick={() => toggleQuestion(activeCategory, index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{isOpen ? '−' : '+'}</span>
              </button>
              <div className={`faq-answer ${isOpen ? 'show' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQAccordion;