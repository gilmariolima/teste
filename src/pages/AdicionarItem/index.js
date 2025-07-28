import { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./add.css";

function AdicionarItem() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState("achado");
  const [imagem, setImagem] = useState(null);
  const navigate = useNavigate();

  // Otimiza a imagem para WebP com largura máxima de 600px
  const compressImage = (file, maxWidth = 600, quality = 0.6) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const scale = Math.min(1, maxWidth / img.width);
          const width = img.width * scale;
          const height = img.height * scale;

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => resolve(blob),
            "image/webp",
            quality
          );
        };
      };
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (imagem) {
        const imagemCompactada = await compressImage(imagem);
        const imageRef = ref(storage, `itens/${Date.now()}-${imagem.name.split(".")[0]}.webp`);
        const snapshot = await uploadBytes(imageRef, imagemCompactada);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

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
    <div className="add-container">
      <h1>Adicionar Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do item</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <input value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Data</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Tipo</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="achado">Achado</option>
            <option value="perdido">Perdido</option>
          </select>
        </div>

        <div className="form-group">
          <label>Foto do item (opcional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AdicionarItem;
