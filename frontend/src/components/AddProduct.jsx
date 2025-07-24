import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function AddProduct() {
  const [form, setForm] = useState({
    name: '', type: '', sku: '', image_url: '', description: '', quantity: '', price: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          price: Number(form.price)
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Product added!');
        navigate('/products');
      } else {
        toast.error(data.error || 'Failed to add product');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Add Product</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="quantity" type="number" min="0" placeholder="Quantity" value={form.quantity} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input name="price" type="number" min="0" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button type="submit" disabled={loading} className="bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition disabled:opacity-60">{loading ? 'Adding...' : 'Add Product'}</button>
        <button type="button" className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition mt-2" onClick={() => navigate('/products')}>Back</button>
      </form>
    </div>
  );
}

export default AddProduct; 