// src/pages/GetStarted.jsx
import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Highlights from '../Components/Highlights';
import ContactUs from '../Components/ContactUs';
import Testimonials from '../Components/Testimonials';
import Footer from '../Components/Footer';

const GetStarted = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div id="highlights">
        <Highlights />
      </div>
      <div id="contact-us">
        <ContactUs />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <Footer />
    </>
  );
};

export default GetStarted;
