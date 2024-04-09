import { useState } from 'react'
import { Cinput } from '../../common/Cinput/Cinput'
import './Login.css'
import { loginService } from '../../services/apiCalls'
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { login } from "../../app/slices/userSlice";
import { userData } from '../../app/slices/userSlice';
import { useDispatch } from "react-redux";

export const Login = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState({

        email: "",
        password: ""
    })

    const inputHandler = (e) => {

        setUser((prevState) => ({

            ...prevState,
            [e.target.name]: e.target.value

        }))
    }

    const loginMe = async () => {

        if (!user.email || !user.password) {
            setErrorMessage("Invalid user credentials");
        return;
        }

        const fetched = await loginService(user)

        if (fetched.token) {
            const decodificado = decodeToken(fetched.token);

            const passport = {
                token: fetched.token,
                user: decodificado,
            };

            dispatch(login({ credentials: passport }));

            setTimeout(() => {
                navigate("/feed")
            }, 500)
        }
    };


    return (
        <div className="login-desing">
            <div className='login-pannel'>

          
                <Cinput 
                    type="email"
                    name="email"
                    placeholder="email"
                    value={user.email || ""}
                    changeEmit={inputHandler}

                />
          
            
                <Cinput 
                    type="password"
                    name="password"
                    placeholder="passsword"
                    value={user.password || ""}
                    changeEmit={inputHandler}

                />
            

            </div>
            <button className="login-button" onClick={loginMe}></button>
            <div className="error">{errorMessage}</div>
        </div>
    )
}
