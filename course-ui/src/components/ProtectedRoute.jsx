import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are provided, check if the user has one of the roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="p-8 text-center text-red-600">Unauthorized Access</div>
    );
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
