import axios from "axios";
import CookieUtils from "../utils/cookieUtils";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_SERVICE_URL}/api`, // Adjust as necessary
});

// Request interceptor: attach access token from cookies.
api.interceptors.request.use(
  (config) => {
    const token = CookieUtils.getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Variables to handle concurrent refresh calls.
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor: handle 401 errors and refresh tokens.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error status is 401 and the request was not already retried.
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // If no refresh token is present, redirect to login.
      const refreshToken = CookieUtils.getCookie("refreshToken");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
      
      // If refresh is already in progress, queue the request.
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        // Call the refresh endpoint using a separate axios call (to avoid interceptor loops).
        const { data } = await axios.post(
          `${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/refresh`,
          { refreshToken }
        );
        // Save new tokens in cookies (adjust expiry days as needed).
        CookieUtils.setCookie("token", data.accessToken, 1);
        CookieUtils.setCookie("refreshToken", data.refreshToken, 1);
        // Update default header.
        api.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
        processQueue(null, data.accessToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // If refresh token fails, redirect to login.
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
