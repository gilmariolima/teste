import { Link } from "react-router-dom";
import "./erro.css";
function Erro(){
    return(
        <div className="container-erro">
            <h1>404</h1>
            <div className="content-erro">
                <h2>Página não encontrada</h2>
                <Link to='/'>Veja nossa Home</Link>
            </div>
        </div>
    )
}

export default Erro;