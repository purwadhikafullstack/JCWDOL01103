import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles, element  }) => {
  const checkAutorization = (requiredRoles) => {
    const userData = jwtDecode(localStorage.getItem("token"));
    if(!userData){
        return <Navigate to="/login" replace />
    }
    const userRoles = userData.role
    return requiredRoles.some((role) => userRoles.includes(role));
  };
  const hasPermission = checkAutorization(roles);
  return (hasPermission ? element : <Navigate to="/" replace />)
};

export default ProtectedRoute;
