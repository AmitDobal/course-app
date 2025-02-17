import api from "./api";
import { CookieUtils } from "../utils/cookieUtils";

export const login = async ({ userIdentifier, password }) => {
  const response = await api.post("/auth/login", { userIdentifier, password });
  return response.data;
};

export const logout = async () => {
  const refreshToken = CookieUtils.getCookie("refreshToken");
  const response = await api.post("/auth/logout", { refreshToken });
  return response.data;
};

export default {
  login,
  logout,
};
