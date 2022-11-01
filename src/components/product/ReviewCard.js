import React from "react";
import { Rating } from "@material-ui/lab";
import { AiOutlineUser } from "react-icons/ai";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <div className="reviewUser">
        <AiOutlineUser />
        <h4>{review.name}</h4>
      </div>
      <Rating {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
