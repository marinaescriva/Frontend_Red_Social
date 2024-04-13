import { Navigate } from "react-router-dom";
import "./CcardDetails.css";
export const CardDetail = ({
  title,
  nick,
  text,
  image,
  likes,
  clickFunction,
}) => {

  return (
    <div className="feed-pannel">
     
      <div className="feed-img">{title}</div>
      <div className="feed-img4">{nick}</div>
      <div className="feed-img2">{text}</div>
      <div className="profile-img">{image}</div>

      <div className="likeSection">
        <div>Likes:</div>
        <div>{likes}</div>
      </div>
      
      <div> 
      <div className="detail-button-feed" onClick={() => clickFunction()}></div>
      </div>

      </div>

        )}