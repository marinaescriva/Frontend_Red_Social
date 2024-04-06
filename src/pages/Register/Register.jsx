import './Register.css'

import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { registerService } from '../../services/apiCalls';
import { Cinput } from '../../common/Cinput/Cinput';

import { doRegister, noRegister } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Register = () => {

    const dispatch = useDispatch();
    const register = useSelector(state => state.user.register);
    const error = useSelector(state => state.user.error);
    const [errorMessage, setErrorMessage] = useState("");


    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",

    })

    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {

        setUser(
            (prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }

    const RegisterUser = async () => {


        try {

            if (user.password.length < 6 || user.password.length > 10) {

                throw new Error("Password must contain between 6 and 10 characters")
            }

            for (let element in user) {
                if (user[element] === "") {
                    throw new Error("All fields should be completed")
                }
            }

            const fetched = await registerService(user);

            if (!fetched.success) {
                throw new Error(fetched.message);
            }

            setMsgError(fetched.message);

                dispatch(doRegister());
                setTimeout(() => { navigate("/login") }, 820)

        } catch (error) {
            setErrorMessage(error.message);
            dispatch(noRegister(error.message))
        }

    }

    return (
        <>
            <div className='register-design'>
                <div className='register-pannel'>
                    <Cinput
                        type="text"
                        name="name"
                        placeholder="name"
                        value={user.name || ""}
                        changeEmit={inputHandler}
                    />
                    <div className='error'>{userError.nameError}</div>

                    <Cinput
                        type="email"
                        name="email"
                        placeholder="email"
                        value={user.email || ""}
                        changeEmit={inputHandler}

                    />
                    <div className='error'>{userError.emailError}</div>

                    <Cinput
                        type="password"
                        name="password"
                        placeholder="passsword"
                        value={user.password || ""}
                        changeEmit={inputHandler}

                    />
                    <div className='error'>{userError.passwordError}</div>
                </div>
                <button
                    className="register-button" onClick={RegisterUser}></button>

                <div className='error'>{errorMessage}</div>
            </div>
        </>
    )
}