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
    <div className="container-perdi">
      <h2 className="titulo-container">Lista de Perdidos</h2>

      <ul className="lista-itens perdidos">
        {perdidos.length === 0 && <p>Nenhum item perdido encontrado.</p>}

        {perdidos.map(item => (
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

export default Perdi;
