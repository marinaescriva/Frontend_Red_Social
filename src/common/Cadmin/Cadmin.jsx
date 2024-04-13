import "./Cadmin.css";
export const CardAdmin = ({
  title,
  text,
  nick,
  image,
  likes,
  deleteFunction,
}) => {

  return (
    
      <div className="admin-pannel">

        <div className="admin-all-posts">

          <div className="admin-post-title">{title}</div>
          <div className="admin-post-nick">{nick}</div>
          <div>{image}</div>
          <div className="admin-post-text">{text}</div>

          <div className="likeSection">
            <div>Likes:</div>
            <div>{likes}</div>
          </div>
          <div>
            <div className="delete-button" onClick={() => deleteFunction}>
            </div>
          </div>
        </div>
      </div>
   
  )
}