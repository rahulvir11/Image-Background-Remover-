// pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StepsSection from '../components/StepsSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StepsSection />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
