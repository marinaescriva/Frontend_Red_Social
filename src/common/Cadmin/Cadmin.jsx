import "./Cadmin.css";
export const CardAdmin = ({
  title,
  nick,
  image,
  description,
  likes,
  deleteFunction,
}) => {

  return (
    <div className="feed-pannel" onClick={deleteFunction}>
     
      <div className="feed-img">{title}</div>
      <div className="feed-img4">{nick}</div>
      <div className="feed-img2">{description}</div>
      <div className="profile-img">{image}</div>
      <div className="likeSection">
        <div>Likes:</div>
        <div>{likes}</div>
      </div>
      <div> 
      <div className="delete-button" onClick={() => deleteFunction}>
        </div>
      </div>
    </div>

        )}