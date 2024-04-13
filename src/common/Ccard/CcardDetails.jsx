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
    <div className="feed-pannel-detail">
     
      <div className="card-title-detail ">{title}</div>
      <div className="card-nick-detail ">{nick}</div>
      <div className="card-text-detail ">{text}</div>
      <div className="card-img-detail ">{image}</div>

      <div className="likeSection-detail ">
        <div className="card-text-detail ">Likes:</div>
        <div className="card-text-detail ">{likes}</div>
      </div>
      
      <div> 
      <div className="detail-button-detail" onClick={() => clickFunction()}></div>
      </div>

      </div>

        )}