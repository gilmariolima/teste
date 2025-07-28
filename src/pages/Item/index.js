import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  doc, getDoc, deleteDoc, updateDoc
} from "firebase/firestore";
import {
  ref, deleteObject, uploadBytes, getDownloadURL
} from "firebase/storage";
import { db, storage } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import "./item.css";

function Item() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { perfil } = useAuth();

  const podeEditar = perfil === "administrador" || perfil === "guarda";

  const [item, setItem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ nome: "", descricao: "", data: "" });
  const [novaImagem, setNovaImagem] = useState(null);

  useEffect(() => {
    async function buscarItem() {
      try {
        const docRef = doc(db, "itens", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setItem(data);
          setFormData({
            nome: data.nome || "",
            descricao: data.descricao || "",
            data: data.data || "",
          });
        } else {
          navigate("/erro");
        }
      } catch (err) {
        console.error("Erro ao buscar item:", err);
      } finally {
        setCarregando(false);
      }
    }

    buscarItem();
  }, [id]);

  async function handleExcluir() {
    if (!window.confirm("Tem certeza que deseja excluir este item?")) return;

    try {
      await deleteDoc(doc(db, "itens", id));
      if (item?.imagem) {
        const imagemRef = ref(storage, item.imagem);
        await deleteObject(imagemRef);
      }
      alert("Item excluído com sucesso");
      navigate("/");
    } catch (err) {
      console.error("Erro ao excluir item:", err);
      alert("Erro ao excluir item");
    }
  }

  async function handleSalvarEdicao() {
    try {
      let urlImagem = item.imagem;

      if (novaImagem) {
        if (item?.imagem) {
          const refAntiga = ref(storage, item.imagem);
          await deleteObject(refAntiga);
        }

        const novaRef = ref(storage, `itens/${Date.now()}-${novaImagem.name}`);
        const snapshot = await uploadBytes(novaRef, novaImagem);
        urlImagem = await getDownloadURL(snapshot.ref);
      }

      await updateDoc(doc(db, "itens", id), {
        nome: formData.nome,
        descricao: formData.descricao,
        data: formData.data,
        imagem: urlImagem,
      });

      setItem(prev => ({
        ...prev,
        ...formData,
        imagem: urlImagem,
      }));

      setNovaImagem(null);
      setEditando(false);
      alert("Item atualizado com sucesso");
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      alert("Erro ao atualizar item");
    }
  }

  if (carregando) return <p className="loading-text">Carregando...</p>;
  if (!item) return <p className="error-text">Item não encontrado.</p>;

  return (
    <div className="container-item">
      <div className="card-item">
        {editando ? (
          <div className="form-editar">
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Nome"
            />
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descrição"
            />
            <input
              type="date"
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setNovaImagem(e.target.files[0])}
            />
            <button className="btn-salvar" onClick={handleSalvarEdicao}>Salvar</button>
            <button className="btn-cancelar" onClick={() => setEditando(false)}>Cancelar</button>
          </div>
        ) : (
          <>
            <h1 className="item-title">{item.nome}</h1>

            {item["achado-perdido"] && (
              <span className={`tag ${item["achado-perdido"] === "achado" ? "achado" : "perdido"}`}>
                {item["achado-perdido"]}
              </span>
            )}

            {item.imagem && (
              <img src={item.imagem} alt={item.nome} className="img-container-item" />
            )}

            <p><strong>Descrição:</strong> {item.descricao}</p>
            <p><strong>Data:</strong> {item.data}</p>

            {podeEditar && (
              <div className="botoes-item">
                <button className="btn-editar" onClick={() => setEditando(true)}>Editar</button>
                <button className="btn-excluir" onClick={handleExcluir}>Excluir</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Item;
