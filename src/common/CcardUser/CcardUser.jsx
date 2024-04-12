import "./CcardUser.css";

export const CardUser = ({
  name,
  email,
  deleteFunction
  
}) => {

  return (
    <div className="feed-pannel2" >
     

      <div className="user_2">{name}</div>
      <div className="user_3">{email}</div>
      <div> 
      <div className="delete-button" onClick={() => deleteFunction}> </div>
      </div>

    </div>

        )}
