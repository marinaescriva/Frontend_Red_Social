import "./Ccard.css";
export const Card = ({
  title,
  nick,
  image,
  description,
  ownerId,
  likes,
  clickFunction,
  detailFunction
}) => {

  return (
    <div className="feed-pannel">
     
      <div className="feed-img">{title}</div>
      <div className="feed-img4">{nick}</div>
      <div className="feed-img2">{description}</div>
      <div className="profile-img">{image}</div>
      <button className="detail-button" onClick={() => detailFunction()}> </button>

      <div className="likeSection">
        <div>Likes:</div>
        <div>{likes}</div>
      </div>
      
      <div> 
      <div className="like-button" onClick={() => clickFunction()}></div>
      </div>

      </div>

        )}