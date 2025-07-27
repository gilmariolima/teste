

import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./add.css";
import { useNavigate } from "react-router-dom";

function AdicionarItem() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState("achado"); // achado ou perdido
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "itens"), {
        nome,
        descricao,
        data,
        "achado-perdido": tipo,
      });

      alert("Item cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
      alert("Erro ao cadastrar item.");
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Adicionar Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do item</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="achado">Achado</option>
            <option value="perdido">Perdido</option>
          </select>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AdicionarItem;

