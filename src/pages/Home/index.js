import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import "./home.css";

function Home() {
  const { usuario } = useAuth();
  const [itensRecentes, setItensRecentes] = useState([]);

  useEffect(() => {
    async function buscarItensRecentes() {
      try {
        const q = query(
          collection(db, "itens"),
          orderBy("data", "desc"),
          limit(5)
        );
        const snapshot = await getDocs(q);
        const itens = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItensRecentes(itens);
      } catch (err) {
        console.error("Erro ao buscar itens recentes:", err);
      }
    }

    buscarItensRecentes();
  }, []);

  return (
    <div className="home">
      <section className="home-hero">
        <h1 className="home-hero-title">Bem-vindo ao Recupera Item</h1>
        <p className="home-hero-subtitle">
          Um sistema de achados e perdidos que conecta pessoas e devolve o que importa. 
          Encontre ou cadastre itens perdidos com facilidade.
        </p>
        <div className="home-nav-buttons">
          <Link to="/achados" className="home-nav-link">Ver Achados</Link>
          <Link to="/perdidos" className="home-nav-link">Ver Perdidos</Link>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="home-benefits">
        <h2 className="home-benefits-title">Por que usar o Recupera Item?</h2>
        <ul className="home-benefits-list">
          <li className="home-benefits-item">🔍 Localize rapidamente itens encontrados</li>
          <li className="home-benefits-item">🔐 Seguro e controlado por administradores</li>
          <li className="home-benefits-item">📱 Compatível com dispositivos móveis</li>
        </ul>
      </section>

      {usuario && (
        <div className="home-recent-section">
          <h2 className="home-recent-title">Itens recentes cadastrados</h2>

          {itensRecentes.length === 0 ? (
            <p style={{ textAlign: "center", color: "#ccc" }}>
              Nenhum item encontrado.
            </p>
          ) : (
            <ul className="home-items-list">
              {itensRecentes.map((item) => (
                <li className="home-item-card" key={item.id}>
                  {item.imagem && (
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="home-item-image"
                    />
                  )}
                  <h3 className="home-item-title">{item.nome}</h3>
                  <p className="home-item-description">
                    {item.descricao?.slice(0, 80) || "Sem descrição."}
                  </p>
                  <Link to={`/item/${item.id}`} className="home-item-link">
                    Ver detalhes
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
