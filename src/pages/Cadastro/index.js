import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cadastro.css';

import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('Aluno');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = { nome, email, senha, perfil };

    try {
      // Cria o usuário com email e senha
      const response = await createUserWithEmailAndPassword(auth, email, senha);

      // Atualiza o nome do usuário
      await updateProfile(response.user, {
        displayName: nome,
      });

      alert('Usuário cadastrado com sucesso!');
      navigate('/'); // Redireciona para a página inicial ou onde quiser
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar usuário: ' + error.message);
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
};

export default Cadastro;
