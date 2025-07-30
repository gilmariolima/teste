
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
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/achados" element={<Achei />} />
        <Route path="/perdidos" element={<Perdi />} />
        <Route path="/item/:id" element={<Item />} />

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
