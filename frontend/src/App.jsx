import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UpdateQuantity from './components/UpdateQuantity';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <header className="app-header">
          <h1>InvetiFi</h1>
          <p className="subtitle">Unique Inventory Management Tool</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/update-quantity/:id" element={<UpdateQuantity />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="app-footer">&copy; {new Date().getFullYear()} FiInventory</footer>
      </div>
    </Router>
  );
}

export default App;
