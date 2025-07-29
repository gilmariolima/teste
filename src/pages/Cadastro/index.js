import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import './cadastro.css';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("aluno");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const isSenhaValida = (senha) => {
    const temLetra = /[A-Za-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    return senha.length >= 8 && temLetra && temNumero;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSenhaValida(senha)) {
      alert("A senha deve ter pelo menos 8 caracteres e conter letras e números.");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = cred.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        nome,
        email,
        perfil,
      });

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Este e-mail já está cadastrado. Tente fazer login.");
      } else {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar. Tente novamente.");
      }
    }
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
          <div className="senha-wrapper">
            <input
              id="senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Senha"
              type={mostrarSenha ? "text" : "password"}
              required
            />
            <span
              className="toggle-senha"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
      <p><Link to="/login">Já tem uma conta?</Link></p>
    </div>
  );
}

export default Cadastro;
