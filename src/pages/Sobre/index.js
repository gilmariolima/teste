import React from "react";
import "./sobre.css";
import { GraduationCap, UserCircle2, ShieldCheck } from "lucide-react"; // Ícones das personas

function Sobre() {
  return (
    <div className="container-sobre">
      <h1>Sobre o sistema</h1>

      <p>
        O sistema tem como objetivo auxiliar alunos, professores e demais
        funcionários da Universidade Federal do Ceará (UFC) na localização e
        recuperação de objetos perdidos dentro do perímetro do campus.
      </p>

      <p>
        Do ponto de vista técnico, o sistema será desenvolvido com base na
        arquitetura Cliente-Servidor e utilizará HTTPS para garantir segurança.
      </p>

      <h2>Módulos do Sistema</h2>
      <ul>
        <li>Frontend Web: Interface gráfica com a qual o usuário interage.</li>
        <li>Backend (API REST): Responsável pela lógica de negócio.</li>
        <li>
          Banco de Dados (PostgreSQL): Armazena dados de objetos e usuários.
        </li>
      </ul>

      <h2>Usuários do Sistema</h2>

      <div className="persona">
        <GraduationCap
          size={32}
          color="#03dac6"
          style={{ marginRight: "0.5rem" }}
        />
        <h3>Aluno</h3>
      </div>
      <p>
        Estudante com rotina intensa. Costuma perder objetos e precisa de um
        meio confiável para recuperar seus pertences por meio da plataforma.
      </p>

      <div className="persona">
        <UserCircle2
          size={32}
          color="#03dac6"
          style={{ marginRight: "0.5rem" }}
        />
        <h3>Docente</h3>
      </div>
      <p>
        Professor com agenda cheia. Pode perder objetos em salas ou
        encontrá-los, e precisa de praticidade para registrar ou consultar.
      </p>

      <div className="persona">
        <ShieldCheck
          size={32}
          color="#03dac6"
          style={{ marginRight: "0.5rem" }}
        />
        <h3>Guarda da Guarita</h3>
      </div>
      <p>
        Responsável por receber objetos encontrados. Utiliza o sistema para
        cadastrar pertences e atualizar seu status.
      </p>
    </div>
  );
}

export default Sobre;