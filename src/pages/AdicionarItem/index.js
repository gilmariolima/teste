import { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./add.css";
import { useNavigate } from "react-router-dom";

function AdicionarItem() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState("achado");
  const [imagem, setImagem] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // Se o usuário selecionou uma imagem, envia para o Storage
      if (imagem) {
        const imageRef = ref(storage, `itens/${Date.now()}-${imagem.name}`);
        const snapshot = await uploadBytes(imageRef, imagem);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Salva os dados no Firestore (com ou sem imagem)
      await addDoc(collection(db, "itens"), {
        nome,
        descricao,
        data,
        "achado-perdido": tipo,
        imagem: imageUrl || null,
      });

      alert("Item cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
      alert("Erro ao cadastrar item.");
    }
  };

  return (
    <div className="cadastro-container add">
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

        <div className="form-group">
          <label>Foto do item (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files[0])}
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AdicionarItem;
