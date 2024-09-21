// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="font-bold">{product.productName}</h2>
      <p>{product.description}</p>
      <p className="text-sm text-gray-500">{product.sustainabilityClaims}</p>
      <a href={`/products/${product.productId}`} className="text-blue-500">View Details</a>
    </div>
  );
};

export default ProductCard;
