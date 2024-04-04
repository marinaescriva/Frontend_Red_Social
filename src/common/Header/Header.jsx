import { Clink } from '../Clink/Clink'
import { useState } from "react";
import './Header.css'


import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { useEffect } from "react";



export const Header = () => {
   //Instancia de conexion a modo lectura
  const rdxUser = useSelector(userData);

  //Instancia de conexion a modo escritura
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(rdxUser, "passport credentials");
  }, [rdxUser]);
  return (
    <div className="header-design">
      <Clink path="/" title="Home" />
      {rdxUser?.credentials?.token ? (
        <div className="navigator-design">
          <Clink path="/profile" title={rdxUser?.credentials?.user?.name} />
          <div
            className="out-design"
            onClick={() => dispatch(logout({ credentials: "" }))}
          >
            log out
          </div>
        </div>
      ) : (
        <div className="navigator-design">
          <Clink path="/login" title="Login" />
          <Clink path="/register" title="Register" />
        </div>
      )}
    </div>
  );
};