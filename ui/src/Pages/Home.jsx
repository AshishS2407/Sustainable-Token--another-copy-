// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import Login from './Login';

const Home = () => {
  return (
    <div>
      <Header />
      <Login/>
      <h2 className="text-xl p-4">Welcome to the Sustainable Product NFT platform!</h2>
    </div>
  );
};

export default Home;
