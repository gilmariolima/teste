
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
import RoleRoute from './components/RoleRoute';
import AdicionarItem from './pages/AdicionarItem';

function RoutesApp() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/cadastro';

  return (
    <>
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<PrivateRoute><Sobre /></PrivateRoute>} />
        <Route path="/contato" element={<PrivateRoute><Contato /></PrivateRoute>} />
        <Route path="/achados" element={<PrivateRoute><Achei /></PrivateRoute>} />
        <Route path="/perdidos" element={<PrivateRoute><Perdi /></PrivateRoute>} />
        <Route path="/item/:id" element={<PrivateRoute><Item /></PrivateRoute>} />

        <Route path="/adicionar-item" element={
          <RoleRoute allowedRoles={["administrador", "guarda"]}>
            <AdicionarItem />
          </RoleRoute>
        } />

        <Route path="*" element={<Erro />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default RoutesApp;
