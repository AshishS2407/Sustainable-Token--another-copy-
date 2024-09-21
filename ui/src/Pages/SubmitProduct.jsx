import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProductForm from '../components/ProductForm';
import Header from '../components/Header';
import SustainableProductNFT from '../scdata/SustainableProductNFT.json'; // Import the ABI

const contractAddress = "0x4D403E4A91357a3F4cE0dF533FF4d9559565c8Ae"; // Your contract address

const SubmitProduct = () => {
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // Function to connect to MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      // Request access to the user's MetaMask account
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err) {
      console.error("Error connecting to MetaMask:", err);
      setError("Failed to connect to MetaMask");
    }
  };

  const handleProductSubmit = async (data) => {
    const { productId, productName, description, ipfsMetadataHash, sustainabilityClaims } = data;
  
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }
  
      // Connect to MetaMask and get the provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // Get signer to send transactions
  
      // Create contract instance with the signer
      const contract = new ethers.Contract(contractAddress, SustainableProductNFT.abi, signer);
  
      // Check if the user is registered
      const user = await contract.users(signer.getAddress());
      if (!user.isRegistered) {
        // If not registered, call the login function
        const txLogin = await contract.login();
        await txLogin.wait(); // Wait for the login transaction to complete
        alert("User logged in successfully!");
      }
  
      // Call the submitAndMintProduct function and send the required ether
      const tx = await contract.submitAndMintProduct(
        productId,
        productName,
        description,
        ipfsMetadataHash,
        sustainabilityClaims,
        { value: ethers.parseEther("0.01") } // Ensure correct ether value is passed
      );
  
      await tx.wait(); // Wait for the transaction to be mined
      alert("Product submitted and NFT minted successfully!");

      // After successful submission, redirect to Product Listing page
      navigate('/products'); // Redirect to the Product Listing page
    } catch (err) {
      console.error("Error submitting product:", err);
      setError("Error submitting product: " + err.message);
    }
  };

  useEffect(() => {
    connectWallet(); // Connect wallet when component loads
  }, []);

  return (
    <div>
      <Header />
      <h2 className="text-xl p-4">Submit a New Product</h2>
      <ProductForm onSubmit={handleProductSubmit} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SubmitProduct;
