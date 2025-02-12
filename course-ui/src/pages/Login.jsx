import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dummy authentication logic; replace with API call
    if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
      const token = 'dummy-admin-token';
      const user = { id: 1, name: 'Admin User', email: credentials.email, role: 'admin' };
      login({ token, user });
      navigate('/admin');
    } else if (credentials.email && credentials.password) {
      const token = 'dummy-user-token';
      const user = { id: 2, name: 'Regular User', email: credentials.email, role: 'user' };
      login({ token, user });
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Login</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-200">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded hover:opacity-90">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
