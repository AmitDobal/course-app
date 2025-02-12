import { Link } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const logoLight = "/assets/logo-light.png";
  const logoDark = "/assets/logo-dark.png";

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
      <nav className="space-x-4">
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
        <Link
          to="/admin"
          className="text-gray-800 dark:text-gray-100 hover:underline">
          Admin
        </Link>
      </nav>
      <ThemeToggle />
    </header>
  );
};

export default Header;
