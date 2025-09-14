import React from 'react';
import SingleTestimonial from './SingleTestimonial';
import ResponsiveGrid from './ResponsiveGrid';
import ResponsiveCard from './ResponsiveCard';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Lisa A.",
    location: "Accra",
    text: "My son's 5th birthday was a hit! The pirate ship bounce house was the highlight of the party. So easy to book and the setup was seamless. The kids had a blast!",
    rating: 5
  },
  {
    id: 2,
    name: "Kwame O.",
    location: "Kumasi",
    text: "We rented the Tropical Thunder Water Slide for our community event and it was a huge success. The quality and cleanliness exceeded our expectations. Will definitely rent again!",
    rating: 5
  },
  {
    id: 3,
    name: "Adwoa M.",
    location: "Takoradi",
    text: "As an event planner, I appreciate the professionalism and reliability of Bounce Kingdom. Their equipment is always in pristine condition and their team is punctual and courteous.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials" id="testimonials">
      <div className="section-header">
        <h2>Happy Families & Event Planners</h2>
        <p>Hear what our customers have to say</p>
      </div>
      
      <div className="testimonials-container">
        {testimonials.map(testimonial => (
          <ResponsiveCard key={testimonial.id} className="testimonial-card" hoverable>
            <div className="responsive-card-content">
              <SingleTestimonial testimonial={testimonial} />
            </div>
          </ResponsiveCard>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;