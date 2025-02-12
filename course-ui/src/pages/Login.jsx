import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy authentication logic; replace with real API integration
    if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
      login({ token: 'dummy-admin-token', user: { id: 1, name: 'Admin', email: credentials.email, role: 'admin' } });
      navigate('/admin');
    } else if (credentials.email && credentials.password) {
      login({ token: 'dummy-user-token', user: { id: 2, name: 'User', email: credentials.email, role: 'user' } });
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Login</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <Button type="submit" variant="primary" size="large" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
