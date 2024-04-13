import "./Ccard.css";
export const Card = ({
  title,
  nick,
  text,
  image,
  likes,
  clickFunction,
  detailFunction
}) => {

  return (
    <div className="feed-pannel">
     
      <div className="card-title">{title}</div>
      <div className="card-nick">{nick}</div>
      <div className="card-text">{text}</div>
      <div className="card-img">{image}</div>
      <button className="detail-button" onClick={() => detailFunction()}> </button>

      <div className="likeSection">
        <div className="card-text">Likes:</div>
        <div>{likes}</div>
      </div>
      
      <div> 
      <div className="like-button" onClick={() => clickFunction()}></div>
      </div>

      </div>

        )}