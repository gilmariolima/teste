import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function RoleRoute({ allowedRoles, children }) {
  const { usuario, perfil, loading } = useAuth();

  if (loading) return null;

  if (!usuario) return <Navigate to="/login" />;

  if (!allowedRoles.includes(perfil)) return <Navigate to="/" />;

  return children;
}

export default RoleRoute;

