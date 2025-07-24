import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setLoading, setError, setPage } from '../slices/productsSlice';
import { logout } from '../slices/authSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function ProductList() {
  const { items: products, loading, error, page, hasMore } = useSelector(state => state.products);
  const token = useSelector(state => state.auth.token);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProducts = async (pageNum = 1) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const res = await fetch(`${API_URL}/products?page=${pageNum}&limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      dispatch(setProducts({ products: data, hasMore: data.length === 10 }));
    } catch (err) {
      dispatch(setError('Could not load products'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts(page);
    }
    // eslint-disable-next-line
  }, [page, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="alert alert-warning shadow-lg w-full max-w-md">
          <span className="text-lg font-semibold">You must login to view the products.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Products</h2>
        <div className="flex gap-2">
          <button onClick={() => navigate('/add-product')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Add Product</button>
          <button onClick={handleLogout} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">Logout</button>
        </div>
      </div>
      {loading && <div className="text-center text-blue-600">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div className="bg-white shadow rounded-lg p-1 flex flex-col items-center border-4 border-gray-700" key={product._id}>
            <div
              className="flex items-center justify-center mb-2 bg-gray-100 border-2 border-gray-400"
              style={{
                width: '6rem',
                height: '4rem',
                minWidth: '6rem',
                minHeight: '4rem',
                maxWidth: '6rem',
                maxHeight: '4rem',
                overflow: 'hidden',
                borderRadius: '0.75rem' // rounded-lg
              }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="object-cover"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="flex-1 flex flex-col gap-0.5 w-full items-center">
              <h3 className="font-bold text-base text-gray-800 text-center">{product.name}</h3>
              <p className="text-xs text-gray-500">SKU: {product.sku}</p>
              <p className="text-sm text-gray-700 text-center">{product.description}</p>
              <p className="text-xs text-gray-500">Type: {product.type}</p>
              <p className="text-sm">Qty: <b>{product.quantity}</b></p>
              <p className="text-sm">₹<span className="font-semibold">{product.price}</span></p>
              <button onClick={() => navigate(`/update-quantity/${product._id}`)} className="mt-1 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition">Update</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Prev</button>
        <span className="font-semibold text-lg">Page {page}</span>
        <button disabled={!hasMore} onClick={() => dispatch(setPage(page + 1))} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

export default ProductList; 