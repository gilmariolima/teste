
import './footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='footer'>
      <Link to="/contato">Contato</Link>
      <Link to="/sobre">Sobre</Link>
    </footer>
  );
}

export default Footer;
