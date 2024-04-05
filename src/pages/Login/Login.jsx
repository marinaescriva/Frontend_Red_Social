import { useState } from 'react'
import { Cinput } from '../../common/Cinput/Cinput'
import './Login.css'
import { loginService } from '../../services/apiCalls'
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";

export const Login = () => {

    const navigate = useNavigate();

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
        const fetched = await loginService(user)
        if (fetched.token) {
            const decodificado = decodeToken(fetched.token);

            const passport = {
                token: fetched.token,
                user: decodificado,
            };

            dispatch(login({ credentials: passport }));

            setTimeout(() => {
                navigate("/")
            }, 500)
        }
    };


    return (
        <div className="login-desing">
            <div className="login-box">
                <Cinput
                    type="email"
                    name="email"
                    value={user.email || ""}
                    changeEmit={inputHandler}

                />
            </div>
            <div className="login-box">
                <Cinput
                    type="password"
                    name="password"
                    value={user.password || ""}
                    changeEmit={inputHandler}

                />
            </div>
            <button className="login-button" onClick={loginMe}>Login</button>

        </div>
    )
}
