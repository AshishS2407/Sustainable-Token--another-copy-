// import React, { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// import Header from '../components/Header';
// import ProductCard from '../components/ProductCard';
// import SustainableProductNFT from '../scdata/SustainableProductNFT.json'; // Import ABI

// const contractAddress = "0x4D403E4A91357a3F4cE0dF533FF4d9559565c8Ae"; // Your contract address

// const ProductListing = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         if (!window.ethereum) {
//           alert("Please install MetaMask!");
//           return;
//         }

//         // Connect to MetaMask
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();

//         // Create contract instance
//         const contract = new ethers.Contract(contractAddress, SustainableProductNFT.abi, signer);

//         // Fetch the number of products (assuming the contract has a function for this)
//         const productCount = await contract.getProductCount();
//         const productList = [];

//         // Loop through products and fetch their data
//         for (let i = 0; i < productCount; i++) {
//           const product = await contract.products(i);
//           productList.push({
//             productId: product.productId,
//             productName: product.productName,
//             description: product.description,
//             ipfsMetadataHash: product.ipfsMetadataHash,
//             sustainabilityClaims: product.sustainabilityClaims,
//           });
//         }

//         setProducts(productList); // Update the state with fetched products
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <Header />
//       <h2 className="text-xl p-4">Product Listings</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//         {products.map((product) => (
//           <ProductCard key={product.productId} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductListing;
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SustainableProductNFT from '../scdata/SustainableProductNFT.json'; // Import ABI

const contractAddress = "0x4D403E4A91357a3F4cE0dF533FF4d9559565c8Ae"; // Your contract address

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        // Connect to MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Create contract instance
        const contract = new ethers.Contract(contractAddress, SustainableProductNFT.abi, signer);

        // Fetch the number of products (assuming the contract has a function for this)
        const productCount = await contract.getProductCount();
        const productList = [];

        // Loop through products and fetch their data
        for (let i = 0; i < productCount; i++) {
          const product = await contract.getProductDetails(i); // Use the correct function to get product details
          productList.push({
            productId: i, // Using the loop index as a unique identifier
            productName: product.productName,
            description: product.description,
            ipfsMetadataHash: product.ipfsMetadataHash,
            sustainabilityClaims: product.sustainabilityClaims,
          });
        }

        setProducts(productList); // Update the state with fetched products
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <h2 className="text-xl p-4">Product Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <ProductCard 
            key={product.productId} // Unique key prop for each ProductCard
            product={product} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
