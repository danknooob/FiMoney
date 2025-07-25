import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to InvetiFi</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        Manage your business inventory with ease. Add, update, and track products securely with a modern, user-friendly interface.
      </p>
      <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded text-lg font-semibold hover:bg-blue-700 transition">
        View Products
      </Link>
    </div>
  );
}

export default Home; 