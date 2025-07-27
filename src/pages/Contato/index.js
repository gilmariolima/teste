import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./contato.css";

function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nome.trim().length < 3) {
      alert("O nome deve conter pelo menos 3 caracteres.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    if (mensagem.trim().length < 10) {
      alert("A mensagem deve conter pelo menos 10 caracteres.");
      return;
    }

    // Enviar via EmailJS
    const templateParams = {
      from_name: nome,
      reply_to: email,
      message: mensagem,
    };

    emailjs
      .send(
        "service_lh4g8ze",       // Ex: "gmailService"
        "template_f3ivu7e",      // Ex: "template_xxxxxx"
        templateParams,
        "xw38StKhb0bYKT-Y8"        // Ex: "wN2ThSx99abC123"
      )
      .then(() => {
        alert("Mensagem enviada com sucesso!");
        setNome("");
        setEmail("");
        setMensagem("");
      })
      .catch((error) => {
        console.error("Erro ao enviar:", error);
        alert("Erro ao enviar a mensagem. Tente novamente.");
      });
  };

  return (
    <div className="container-contato add">
      <h1>Fale Conosco</h1>
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
          <label>Mensagem:</label>
          <textarea
            rows="5"
            maxLength="500"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
}

export default Contato;
