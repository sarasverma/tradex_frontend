import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const Product = ({ product }) => {
  const options = {
    size: "small",
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <h4>{product.name}</h4>
      <div>
        <Rating {...options} /> <span>({product.noOfReviews} reviews)</span>
      </div>
      <span>
        <h4>₹{product.price}</h4>
      </span>
    </Link>
  );
};

export default Product;
