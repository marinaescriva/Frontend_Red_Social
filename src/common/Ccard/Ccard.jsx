import "./Ccard.css";
export const Card = ({
  title,
  nick,
  image,
  description,
  ownerId,
  likes,
  clickFunction,
}) => {

  return (
    <div className="feed-pannel" onClick={clickFunction}>
     
      <div className="feed-img">{title}</div>
      <div className="feed-img4">{nick}</div>
      <div className="feed-img2">{description}</div>
      <div className="profile-img">{image}</div>
      <div className="likeSection">
        <div>Likes:</div>
        <div>{likes}</div>
      </div>
      <div> 
      <div className="like-button" onClick={() => clickFunction}>
        </div>
      </div>
    </div>

        )}