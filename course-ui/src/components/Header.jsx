import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";
import { AuthContext } from "../contexts/AuthContext";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center space-x-4">
        <Logo
          logoLight={logoLight}
          logoDark={logoDark}
          altText="Course Platform Logo"
        />
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Course Platform
        </h1>
      </div>
      <nav className="flex items-center space-x-4">
        <Link
          to="/"
          className="text-gray-800 dark:text-gray-100 hover:underline">
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-800 dark:text-gray-100 hover:underline">
          About
        </Link>
        <Link
          to="/courses"
          className="text-gray-800 dark:text-gray-100 hover:underline">
          Courses
        </Link>
        {user ? (
          <>
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="text-gray-800 dark:text-gray-100 hover:underline">
                Admin
              </Link>
            )}
            <Button onClick={logout} variant="outline" size="small">
              Logout
            </Button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-gray-800 dark:text-gray-100 hover:underline">
            Login
          </Link>
        )}
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
