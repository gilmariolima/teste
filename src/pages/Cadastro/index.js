// pages/Cadastro/index.js
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import './cadastro.css';

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("aluno");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = cred.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      nome,
      email,
      perfil,
    });

    navigate("/");
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Nome"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Senha"
            type="password"
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
