// src/components/ProductForm.jsx
import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    description: '',
    ipfsMetadataHash: '',
    sustainabilityClaims: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="productId" placeholder="Product ID" onChange={handleChange} required />
      <input name="productName" placeholder="Product Name" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input name="ipfsMetadataHash" placeholder="IPFS Metadata Hash" onChange={handleChange} required />
      <input name="sustainabilityClaims" placeholder="Sustainability Claims" onChange={handleChange} required />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default ProductForm;
