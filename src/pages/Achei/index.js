import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import "./achei.css";

function Achei() {
  const [achados, setAchados] = useState([]);

  useEffect(() => {
    async function buscarAchados() {
      try {
        const q = query(collection(db, "itens"), where("achado-perdido", "==", "achado"));
        const snapshot = await getDocs(q);
        const itens = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAchados(itens);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      }
    }

    buscarAchados();
  }, []);

  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-hero-title">Itens Achados</h1>
        <p className="home-hero-subtitle">Veja os objetos encontrados recentemente e ajude a devolvê-los ao dono.</p>
      </div>

      <div className="home-recent-section">
        <h2 className="home-recent-title">Lista de Achados</h2>

        {achados.length === 0 ? (
          <p style={{ textAlign: "center", color: "#ccc" }}>Nenhum item achado encontrado.</p>
        ) : (
          <ul className="home-items-list">
            {achados.map(item => (
              <li className="home-item-card" key={item.id}>
                {item.imagem && (
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="home-item-image"
                    loading="lazy"
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
    </div>
  );
}

export default Achei;
