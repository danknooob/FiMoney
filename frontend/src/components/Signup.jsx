import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('All fields are required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.status === 201) {
        toast.success('Signup successful! Please sign in.');
        navigate('/login');
      } else {
        toast.error(data.error || 'Signup failed');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <form className="card bg-base-100 shadow-xl p-8 w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">Sign Up</h2>
        <label className="form-control w-full">
          <span className="label-text">Full Name</span>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">Email</span>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">Password</span>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </label>
        <button type="submit" disabled={loading} className="btn btn-primary w-full">{loading ? 'Signing up...' : 'Sign Up'}</button>
        <div className="text-center text-sm mt-2">
          Already registered?{' '}
          <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/login')}>
            Sign in
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup; 