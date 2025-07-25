import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { FaBoxOpen, FaSignOutAlt, FaBars } from 'react-icons/fa';

function Navbar() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`block py-2 px-3 rounded-sm font-semibold transition-colors duration-200
        ${location.pathname === to
          ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700'
          : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700'}
      `}
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white border-gray-200 shadow">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <FaBoxOpen className="text-blue-600 text-2xl" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-700">
            InvetiFi
          </span>
        </Link>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <FaBars className="w-5 h-5" />
        </button>
        <div className={`${menuOpen ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>{navLink('/', 'Home')}</li>
            {isAuthenticated && <li>{navLink('/products', 'Products')}</li>}
            {isAuthenticated && <li>{navLink('/add-product', 'Add Product')}</li>}
            <li>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition font-bold"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              ) : (
                navLink('/login', 'Login')
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;