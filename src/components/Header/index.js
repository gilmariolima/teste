import "./header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function Header() {
  const { usuario } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header>
      <Link className="logo" to="/">Meu site</Link>
      <div className="pag">
        <Link to="/achados">Achados</Link>
        <Link to="/perdidos">Perdidos</Link>
      </div>
      <div className="nav">
        {usuario ? (
          <>
            <span className="username">
              Olá, {usuario.displayName || usuario.email}
            </span>
            <button onClick={handleLogout} className="logout-btn">Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
