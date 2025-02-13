import { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../contexts/ThemeContext";

const Logo = ({ logoLight, logoDark, altText }) => {
  const { theme } = useContext(ThemeContext);
  const logoSrc = theme === "light" ? logoLight : logoDark;
  return <img src={logoSrc} alt={altText} className="h-8" />;
};

Logo.propTypes = {
  logoLight: PropTypes.string.isRequired,
  logoDark: PropTypes.string.isRequired,
  altText: PropTypes.string,
};

Logo.defaultProps = {
  altText: "Logo",
};

export default Logo;
