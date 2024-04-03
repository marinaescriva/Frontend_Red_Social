import "./Clink.css";
import { useNavigate } from "react-router-dom";

export const Clink = ({path, title})=> {

    const navigate = useNavigate()

    return (
        <div className= "clink-desing" onClick={() => navigate (path)}>{title}</div>
    )
}