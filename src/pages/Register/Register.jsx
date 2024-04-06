import './Register.css'

import { useNavigate } from "react-router-dom";
import { useState} from 'react';
import { registerService } from '../../services/apiCalls';
import { Cinput } from '../../common/Cinput/Cinput';
// import { CButton } from '../../common/CButton/CButton';


// import { validation } from '../../utils/functions';


export const Register = () => {

    const navigate = useNavigate();

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
    
    const checkError = (e) => {

        const error = validation(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))

    }
    
    const RegisterUser = async () => {

        try {

            for (let element in user) {
                if (user[element] === "") {
                    throw new Error("All fields should be completed")
                }
            }
            const fetched = await registerService(user);
            setMsgError(fetched.message);
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
                    value={user.name || ""}
                    changeEmit={inputHandler}
                />
                <div className='error'>{userError.nameError}</div>
                {/* <Cinput
                    className={`custominputDesign ${credentialsError.surnameError !== "" ? "custominputDesignError" : ""}`}
                    type={"text"}
                    name={"surname"}
                    value={credentials.surname || ""}
                    placeholder={"surname"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{credentialsError.surnameError}</div>
                <Cinput
                    className={`custominputDesign ${credentialsError.emailError !== "" ? "custominputDesignError" : ""}`}
                    type={"email"}
                    name={"email"}
                    value={credentials.email || ""}
                    placeholder={"email"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                />
                <div className='error'>{credentialsError.emailError}</div>

                <Cinput
                    className={`custominputDesign ${credentialsError.passwordError !== "" ? "custominputDesignError" : ""}`}
                    type={"password"}
                    name={"password"}
                    value={credentials.password || ""}
                    placeholder={"password"}
                    disabled={""}
                    functionChange={(e) => inputHandler(e)}
                    functionBlur={(e) => checkError(e)}
                /> */}
                <div className='error'>{userError.passwordError}</div>

                <button
                 className="login-button" onClick={RegisterUser}></button>
                
                <div className='error'>{msgError}</div>
            </div>
        </>
    )
}