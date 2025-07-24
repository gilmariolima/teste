
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./item.css"

function Item(){
    const { id } = useParams()
    return(
        <div className="container-item">
            <h1>item com id {id} aqui</h1>
        </div>
    )
}
export default Item;