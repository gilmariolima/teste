import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import "./header.css";

function Header() {
  const { usuario, perfil, nome } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className="glass-header">
      <Link className="logo" to="/">
        <span>Recupera</span> Itens
      </Link>

      <button className="menu-toggle" onClick={toggleMenu}>
        {menuAberto ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <nav className={`nav-container ${menuAberto ? "ativo" : ""}`}>
        <div className="pag">
          <Link to="/achados" onClick={() => setMenuAberto(false)}>Achados</Link>
          <Link to="/perdidos" onClick={() => setMenuAberto(false)}>Perdidos</Link>
          {(perfil === "guarda" || perfil === "administrador") && (
            <Link to="/adicionar-item" onClick={() => setMenuAberto(false)}>Adicionar Item</Link>
          )}
        </div>

        <div className="nav">
          {usuario ? (
            <>
              <span className="username">
                <FaUserCircle size={18} /> {nome}
              </span>
              <button onClick={handleLogout} className="logout-btn">
                <FaSignOutAlt /> Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuAberto(false)}>Login</Link>
              <Link to="/cadastro" onClick={() => setMenuAberto(false)}>Cadastro</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
