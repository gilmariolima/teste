import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import './header.css'


function Header() {
  const { usuario, perfil, nome } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header>
      <Link className="logo" to="/">Meu site</Link>
      <div className="pag">
        <Link to="/achados">Achados</Link>
        <Link to="/perdidos">Perdidos</Link>
        {(perfil === "guarda" || perfil === "administrador") && (
          <Link to="/adicionar-item">Adicionar Item</Link>
        )}
      </div>
      <div className="nav">
        {usuario ? (
          <>
            <span className="username">Olá, {nome}</span>
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