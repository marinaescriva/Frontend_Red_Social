import { Clink } from '../Clink/Clink'
import { useState } from "react";
import './Header.css'


import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { updateCriteria } from "../../app/slices/searchSlice";
import { useEffect } from "react";
// import { Cinput } from '../Cinput/Cinput';


export const Header = () => {
  //Instancia de conexion a modo lectura
  const rdxUser = useSelector(userData);

  //Instancia de conexion a modo escritura
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(rdxUser, "passport credentials");
  }, [rdxUser]);

  const [criteria, setCriteria] = useState("")

  const searchHandler = (e) => {
    setCriteria(e.target.value)
  }

  useEffect(() => {
    if (criteria !== "") {
      //guardo en redux.....
      dispatch(updateCriteria(criteria))
    }
  }, [criteria])

  return (
    <div className='header-design'>
      <div className="header-center">
        <div className="header-home-design">
          <Clink path="/" title="Home" />

        </div>
      </div>
      <div className="header-right">
        {rdxUser?.credentials?.token

          ? (
            <div className="header-login-register">
              <Clink path="/feed" title="Feed" />
              <Clink path="/profile" title={rdxUser?.credentials?.user?.name} />

               {rdxUser?.credentials?.user?.roleName === "super_admin"
                ? <Clink path="/admin" title="Super Admin" />
                : null
              }

              <div onClick={() => dispatch(logout({ credentials: "" }))}>
                <Clink path="/" title={"Log out"} />
              </div>

            </div>

          ) : (
            <div className="header-login-register">
              <Clink path="/login" title="Login" />
              <Clink path="/register" title="Register" />
            </div>
          )}
      </div>
    </div>
  )

}