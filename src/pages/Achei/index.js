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
    <div className="container-achei">
      <h2 className="titulo-container">Lista de Achados</h2>
      <ul className="lista-itens achados">
        {achados.length === 0 && <p>Nenhum item achado encontrado.</p>}

        {achados.map(item => (
          <li className="item" key={item.id}>
            <h2 className="titulo-item">{item.nome}</h2>
            {item.imagem && (
              <img className="img-item" src={item.imagem} alt={item.nome} />
            )}
            <Link className="link-item" to={`/item/${item.id}`}>Detalhes</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Achei;
