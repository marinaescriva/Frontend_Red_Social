import { Clink } from '../Clink/Clink'
import './Header.css'

export const Header = () => {
    return (
        <div className="header-desing">
            <Clink path= "/" title= "Home" />
            <Clink path= "/register" title= "Register" />
            <Clink path= "/login" title= "Login" />
        
        </div>
    )
}