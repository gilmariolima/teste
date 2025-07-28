import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import "./home.css";

function Home() {
  const [itensRecentes, setItensRecentes] = useState([]);

  useEffect(() => {
    async function carregarItens() {
      try {
        const q = query(collection(db, "itens"), orderBy("data", "desc"), limit(4));
        const snapshot = await getDocs(q);
        const dados = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItensRecentes(dados);
      } catch (err) {
        console.error("Erro ao buscar itens recentes:", err);
      }
    }

    carregarItens();
  }, []);

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__hero-title">Bem-vindo ao Recupera Item</h1>
        <p className="home__hero-subtitle">
          Um sistema de achados e perdidos que conecta pessoas e devolve o que importa. 
          Encontre ou cadastre itens perdidos com facilidade.
        </p>
        <div className="home__nav-buttons">
          <Link to="/achados" className="home__nav-link">Ver Achados</Link>
          <Link to="/perdidos" className="home__nav-link">Ver Perdidos</Link>
        </div>
      </section>

      <section className="home__benefits">
        <h2 className="home__benefits-title">Por que usar o Recupera Item?</h2>
        <ul className="home__benefits-list">
          <li className="home__benefits-item">🔍 Localize rapidamente itens encontrados</li>
          <li className="home__benefits-item">📝 Cadastre objetos perdidos facilmente</li>
          <li className="home__benefits-item">🔐 Seguro e controlado por administradores</li>
          <li className="home__benefits-item">📱 Compatível com dispositivos móveis</li>
        </ul>
      </section>

      <section className="home__recent-section">
        <h2 className="home__recent-title">Itens recentes cadastrados</h2>
        <ul className="home__items-list">
          {itensRecentes.map(item => (
            <li key={item.id} className="home__item-card">
              {item.imagem && (
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="home__item-image"
                />
              )}
              <h3 className="home__item-title">{item.nome}</h3>
              <p className="home__item-description">{item.descricao}</p>
              <Link to={`/item/${item.id}`} className="home__item-link">
                Ver detalhes
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
