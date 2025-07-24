import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

function UpdateQuantity() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/products/${id}/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: Number(quantity) })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Quantity updated!');
        navigate('/products');
      } else {
        toast.error(data.error || 'Failed to update quantity');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Update Quantity</h2>
        <input
          type="number"
          min="0"
          placeholder="New Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-60">{loading ? 'Updating...' : 'Update'}</button>
        <button type="button" className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition mt-2" onClick={() => navigate('/products')}>Back</button>
      </form>
    </div>
  );
}

export default UpdateQuantity; 