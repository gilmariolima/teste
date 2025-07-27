
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDwVBuUSuNASGqULUSZvgP88yEj6d6ZdU",
  authDomain: "recupera-itens.firebaseapp.com",
  projectId: "recupera-itens",
  storageBucket: "recupera-itens.firebasestorage.app",
  messagingSenderId: "532825523442",
  appId: "1:532825523442:web:c6f93508aa729e7abc7c6b",
  measurementId: "G-1DBY0C14YV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage(app);
export { auth, db, storage };

