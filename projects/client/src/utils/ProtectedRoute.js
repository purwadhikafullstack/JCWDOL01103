import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ roles, element }) => {
  const location = useLocation()
  console.log(location)
  const token = localStorage.getItem("token");
  const checkAutorization = (requiredRoles) => {
    const userData = token && jwtDecode(token);
    if (!userData) {
      return false;
    }
    const userRoles = userData.role;
    return requiredRoles.some((role) => userRoles.includes(role));
  };
  const hasPermission = checkAutorization(roles);
  if (hasPermission) {
    return element;
  } else {
    return token ? (
      <Navigate to="/forbidden" replace />
    ) : (
      <Navigate to="/login" state={{redirect:location.pathname}} replace/>
    );
  }
};

export default ProtectedRoute;
