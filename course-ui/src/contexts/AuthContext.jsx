import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
// import jwtDecode from 'jwt-decode'; // Optionally decode JWT to get info

export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // On mount, load stored token/user from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = async ({ userIdentifier, password }) => {
    try {
      const response = await api.post('/auth/login', { userIdentifier, password });
      const { accessToken, refreshToken, username: uname, role } = response.data;
      setToken(accessToken);
      const userData = { username: uname, role };
      setUser(userData);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await api.post('/auth/logout', { refreshToken });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
