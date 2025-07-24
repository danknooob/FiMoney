import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

function Navbar() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="w-full bg-gray-800 text-white px-4 py-2 flex items-center justify-between shadow">
      <div className="flex items-center gap-6">
        <Link to="/" className="font-bold text-xl hover:text-blue-300">FiInventory</Link>
        <Link to="/" className="hover:text-blue-300">Home</Link>
        {isAuthenticated && <Link to="/products" className="hover:text-blue-300">Products</Link>}
        {isAuthenticated && <Link to="/add-product" className="hover:text-blue-300">Add Product</Link>}
      </div>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">Logout</button>
        ) : (
          <Link to="/login" className="hover:text-blue-300">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 