import './Register.css'

import { useNavigate } from "react-router-dom";
import { useState} from 'react';
import { registerService } from '../../services/apiCalls';
import { Cinput } from '../../common/Cinput/Cinput';
import { decodeToken } from "react-jwt";

import { register } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";


export const Register = () => {

    
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    })

    const [userError, setUserError] = useState({
        nameError: "",
        surnameError: "",
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
    
    // const checkError = (e) => {

    //     const error = validation(e.target.name, e.target.value);

    //     setUserError((prevState) => ({
    //         ...prevState,
    //         [e.target.name + "Error"]: error,
    //     }))

    
    
    const RegisterUser = async () => {

        try {

            // for (let element in user) {
            //     if (user[element] === "") {
            //         throw new Error("All fields should be completed")
            //     }
            // }
            const fetched = await registerService(user);
            setMsgError(fetched.message);

            // dispatch(Register({ user: passport }));

            setTimeout(() => { navigate("/login") }, 820) 


        } catch (error) {
            setMsgError(error.message)
            return;
        }

    }

    return (
        <>
            <div className='register-design'>
                {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
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

                <button
                 className="register-button" onClick={RegisterUser}></button>
                
                <div className='error'>{msgError}</div>
            </div>
        </>
    )
}