import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_SERVICE_URL}/api`, // Adjust port if necessary
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally handle unauthorized errors (logout, token refresh, etc.)
    }
    return Promise.reject(error);
  }
);

export default api;
