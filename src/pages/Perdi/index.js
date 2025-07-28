import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import "./perdi.css";

function Perdi() {
  const [perdidos, setPerdidos] = useState([]);

  useEffect(() => {
    async function buscarPerdidos() {
      try {
        const q = query(collection(db, "itens"), where("achado-perdido", "==", "perdido"));
        const snapshot = await getDocs(q);
        const itens = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPerdidos(itens);
      } catch (err) {
        console.error("Erro ao buscar itens perdidos:", err);
      }
    }

    buscarPerdidos();
  }, []);

  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-hero-title">Itens Perdidos</h1>
        <p className="home-hero-subtitle">
          Se você viu algum desses itens, por favor entre em contato e ajude quem perdeu!
        </p>
      </div>

      <div className="home-recent-section">
        <h2 className="home-recent-title">Lista de Perdidos</h2>

        {perdidos.length === 0 ? (
          <p style={{ textAlign: "center", color: "#ccc" }}>Nenhum item perdido encontrado.</p>
        ) : (
          <ul className="home-items-list">
            {perdidos.map(item => (
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
    </div>
  );
}

export default Perdi;
