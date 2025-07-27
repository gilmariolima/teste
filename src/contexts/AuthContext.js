import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [nome, setNome] = useState(null); // <- Novo
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);
        try {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const dados = docSnap.data();
            setPerfil(dados.perfil);
            setNome(dados.nome); // <- Captura o nome
          } else {
            console.warn("Usuário logado, mas sem documento no Firestore");
            setPerfil(null);
            setNome(null);
          }
        } catch (err) {
          console.error("Erro ao buscar perfil do usuário:", err);
          setPerfil(null);
          setNome(null);
        }
      } else {
        setUsuario(null);
        setPerfil(null);
        setNome(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, perfil, nome, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
