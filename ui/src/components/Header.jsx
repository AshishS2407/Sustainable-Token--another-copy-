// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl">Sustainable Product NFTs</h1>
      <nav>
        <a href="/" className="mr-4">Home</a>
        <a href="/submit-product" className="mr-4">Submit Product</a>
        <a href="/products">Product Listing</a>
      </nav>
    </header>
  );
};

export default Header;
