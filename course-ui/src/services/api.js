import axios from 'axios';

// Create an Axios instance with a base URL (adjust as needed)
const api = axios.create({
  baseURL: 'https://api.yourdomain.com/api/v1', // Replace with your API base URL
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    // Option 1: Retrieve token from localStorage (simplest)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Option 2: Alternatively, you can integrate with AuthContext if needed.
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional)
// Here you can add error handling or token refresh logic
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors, token refresh, etc.
    // For example:
    if (error.response && error.response.status === 401) {
      // Optionally trigger logout or token refresh
    }
    return Promise.reject(error);
  }
);

export default api;
