import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      console.log("Login bem-sucedido");
      navigate("/"); // Redireciona para a home
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      setErro("Credenciais inválidas");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {erro && <p className="erro">{erro}</p>}
      <form className="form-group" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button className="btn-entrar" type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
    </div>
  );
};

export default Login;
