import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Item from './pages/Item';
import Perdi from './pages/Perdi';
import Achei from './pages/Achei';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Header from './components/Header';
import Footer from './components/Footer';
import Erro from './components/Erro';
import PrivateRoute from './components/PrivateRoute';

function RoutesApp() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/cadastro';

  return (
    <>
      {/* Só mostra o Header se não estiver em login ou cadastro */}
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/sobre" element={<PrivateRoute><Sobre /></PrivateRoute>} />
        <Route path="/contato" element={<PrivateRoute><Contato /></PrivateRoute>} />
        <Route path="/achados" element={<PrivateRoute><Achei /></PrivateRoute>} />
        <Route path="/perdidos" element={<PrivateRoute><Perdi /></PrivateRoute>} />
        <Route path="/achados/item/:id" element={<PrivateRoute><Item /></PrivateRoute>} />
        <Route path="/perdidos/item/:id" element={<PrivateRoute><Item /></PrivateRoute>} />
        <Route path="*" element={<Erro />} />
      </Routes>

      {/* Só mostra o Footer se não estiver em login ou cadastro */}
      {!isAuthPage && <Footer />}
    </>
  );
}

export default RoutesApp;
