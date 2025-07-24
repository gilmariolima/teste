// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDwVBuUSuNASGqULUSZvgP88yEj6d6ZdU",
  authDomain: "recupera-itens.firebaseapp.com",
  projectId: "recupera-itens",
  storageBucket: "recupera-itens.firebasestorage.app",
  messagingSenderId: "532825523442",
  appId: "1:532825523442:web:c6f93508aa729e7abc7c6b",
  measurementId: "G-1DBY0C14YV"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Exporta o serviço de autenticação
const auth = getAuth(app);

export { auth };
