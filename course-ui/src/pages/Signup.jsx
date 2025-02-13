import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/auth/signup', data);
      setSuccess('User registered successfully. Redirecting to login...');
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      // Handle errors; customize based on your API's error structure
      const msg =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Registration failed. Please try again.';
      setError(msg);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Sign Up
      </h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <Button type="submit" variant="primary" size="large" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
