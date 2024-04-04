import { Clink } from '../Clink/Clink'
import { useState } from "react";
import './Header.css'


import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { updateCriteria } from "../../app/slices/searchSlice";
import { useEffect } from "react";
import { Cinput } from '../Cinput/Cinput';


export const Header = () => {
  //Instancia de conexion a modo lectura
  const rdxUser = useSelector(userData);

  //Instancia de conexion a modo escritura
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(rdxUser, "passport credentials");
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
    <div className="header-design">

      <Cinput
        type="text"
        name="criteria"
        value={criteria || ""}
        changeEmit={searchHandler}
      />

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