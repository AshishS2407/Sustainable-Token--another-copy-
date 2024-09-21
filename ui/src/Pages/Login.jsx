import React, { useState } from "react";
import { ethers } from "ethers";
import SustainableProductNFT from "../scdata/SustainableProductNFT.json"; // Adjust the path as needed

const contractAddress = "0x0bAC2940cd53b93Bf79CC66a8c26814e6e3446cf"; // Your contract address

const Login = () => {
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");

  const loginWithMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        setAccount(userAddress);
        
        const networkId = (await provider.getNetwork()).chainId;

        // Create a contract instance with the provided address
        const contractInstance = new ethers.Contract(contractAddress, SustainableProductNFT.abi, signer);

        // Call the login function from the contract
        const tx = await contractInstance.login();
        await tx.wait(); // Wait for the transaction to be mined
        alert("Logged in successfully!");
      } catch (err) {
        console.error("Error logging in:", err);
        setError("Failed to log in. Make sure you're connected to the right network.");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl mb-4">Login with MetaMask</h2>
      <button
        onClick={loginWithMetaMask}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {account ? `Logged in as: ${account}` : "Login"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
