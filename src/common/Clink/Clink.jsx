import "./Clink.css";
import { useNavigate } from "react-router-dom";

export const Clink = ({path, title})=> {

    const navigate = useNavigate()

    return (
        <div className= "clink-design" onClick={() => navigate (path)}>{title}</div>
    )
}

export const ClinkPost = ({path, title})=> {

    const navigate = useNavigate()

    return (
        <div className= "clink-design-post" onClick={() => navigate (path)}>{title}</div>
    )
}