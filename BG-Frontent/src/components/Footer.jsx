// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-10">
      <p>&copy; {new Date().getFullYear()} Backend Remover. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
