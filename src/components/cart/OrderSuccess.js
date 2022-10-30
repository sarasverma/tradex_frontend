import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "./OrderSuccess.css";
import { AiFillCheckCircle } from "react-icons/ai";

const OrderSuccess = () => {
  return (
    <>
      <div className="orderSuccess">
        <AiFillCheckCircle />
        <Typography>Your order has been placed successfully.</Typography>
        <Link to="/order/me" className="btn">
          View order
        </Link>
      </div>
    </>
  );
};

export default OrderSuccess;
