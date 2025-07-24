import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { FaBoxOpen } from 'react-icons/fa';

function Navbar() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`px-3 py-1 rounded transition-colors duration-200 font-medium hover:bg-blue-100 hover:text-blue-700 ${location.pathname === to ? 'bg-blue-600 text-white' : 'text-gray-800'}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="w-full bg-gradient-to-r from-blue-50 via-blue-100 to-teal-100 shadow flex items-center justify-between px-6 py-3 mb-2 transition-all duration-300">
      <div className="flex items-center gap-4">
        <FaBoxOpen className="text-blue-600 text-2xl mr-2" />
        <Link to="/" className="font-bold text-2xl tracking-tight text-blue-700 hover:text-blue-900 transition-colors duration-200">FiInventory</Link>
        {navLink('/', 'Home')}
        {isAuthenticated && navLink('/products', 'Products')}
        {isAuthenticated && navLink('/add-product', 'Add Product')}
      </div>
      <div>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1.5 rounded shadow hover:scale-105 active:scale-95 transition-all duration-200 font-semibold"
          >
            Logout
          </button>
        ) : (
          navLink('/login', 'Login')
        )}
      </div>
    </nav>
  );
}

export default Navbar; 