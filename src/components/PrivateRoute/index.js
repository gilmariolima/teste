// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function PrivateRoute({ children, requiredPerfil }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (requiredPerfil && usuario.perfil !== requiredPerfil) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
