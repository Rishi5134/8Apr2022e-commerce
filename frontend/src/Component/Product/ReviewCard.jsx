import React from "react";
import ReactStars from "react-rating-stars-component";
import userIcon from "../../Images/User_Icon.png";
import './ProductDetails.css';

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    isHalf: true,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: review.rating,
    size: 30,
  };
  return (
    <>
      <div className="userReview">
        <img src={userIcon} alt="User Icon" />
        <h1>{review.name}</h1>
        <ReactStars {...options} />
        <p className="text-justify my-2">{review.comment}</p>
      </div>
    </>
  );
};

export default ReviewCard;
