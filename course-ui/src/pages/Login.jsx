import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import CookieUtils from "../utils/cookieUtils";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    userIdentifier: "amitsingh",
    password: "Admin@1234",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      // Retrieve the stored user from cookies
      const storedUser = CookieUtils.getCookie("user");
      const userRole = storedUser ? JSON.parse(storedUser).role : null;
      if (userRole === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Login
      </h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          type="text"
          name="userIdentifier"
          value={credentials.userIdentifier}
          onChange={handleChange}
          placeholder="Enter your username"
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
