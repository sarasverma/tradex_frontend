import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images[0].url} alt={product.name} />
      <h4>{product.name}</h4>
      <div>
        <ReactStars {...options} /> <span>({product.noOfReviews} reviews)</span>
      </div>
      <span>
        <h4>₹{product.price}</h4>
      </span>
    </Link>
  );
};

export default Product;
