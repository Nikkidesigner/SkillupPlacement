import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/unauthorized" />;

  return children;
};

PrivateRoute.propTypes = {
  role: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
