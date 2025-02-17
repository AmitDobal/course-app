import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { CookieUtils } from "../utils/cookieUtils";
import authService from "../services/authService";

export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // On mount, load stored token/user from cookies
  useEffect(() => {
    const storedToken = CookieUtils.getCookie("token");
    const storedUser = CookieUtils.getCookie("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async ({ userIdentifier, password }) => {
    try {
      const {
        accessToken,
        refreshToken,
        username: uname,
        role,
      } = await authService.login({ userIdentifier, password });
      setToken(accessToken);
      const userData = { username: uname, role };
      setUser(userData);
      // Save tokens and user info in cookies (expires in 1 day)
      CookieUtils.setCookie("token", accessToken, 1);
      CookieUtils.setCookie("user", JSON.stringify(userData), 1);
      CookieUtils.setCookie("refreshToken", refreshToken, 1);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
    setToken(null);
    setUser(null);
    CookieUtils.eraseCookie("token");
    CookieUtils.eraseCookie("user");
    CookieUtils.eraseCookie("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
