import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function RoleRoute({ allowedRoles, children }) {
  const { usuario, perfil, loading } = useAuth();

  // Espera o Firebase responder antes de decidir o que fazer
  if (loading) return null; // ou uma tela de loading, tipo <div>Carregando...</div>

  if (!usuario) return <Navigate to="/login" />;
  if (!allowedRoles.includes(perfil)) return <Navigate to="/" />;

  return children;
}

export default RoleRoute;
