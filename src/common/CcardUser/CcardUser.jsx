import "./CcardUser.css";

export const CardUser = ({
  name,
  email,
  deleteFunction

}) => {

  return (
    <div className="admin-pannel" >


      <div className="admin-user-name">{name}</div>
      <div className="admin-user-email">{email}</div>

      <div className="deleteSection-admin">
        <div className="delete-button">
          <div onClick={() => deleteFunction}> </div>
        </div>
      </div>
      
    </div>

  )
}
