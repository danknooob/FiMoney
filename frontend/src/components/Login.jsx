import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../slices/authSlice';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        dispatch(loginSuccess(data.access_token));
        toast.success('Login successful!');
        navigate('/products');
      } else {
        dispatch(loginFailure(data.error || 'Login failed'));
        toast.error(data.error || 'Login failed');
      }
    } catch (err) {
      dispatch(loginFailure('Network error'));
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh]">
      <form className="card bg-base-100 shadow-xl p-8 w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">Login</h2>
        <label className="form-control w-full">
          <span className="label-text">Email</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text">Password</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center text-sm mt-2">
          New user?{' '}
          <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login; 