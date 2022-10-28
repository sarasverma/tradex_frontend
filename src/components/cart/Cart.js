import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";

const Cart = () => {
  const item = {
    product: "Product ID",
    price: 200,
    name: "khali",
    quantity: 4,
    image:
      "https://cdn.pixabay.com/photo/2022/01/27/21/39/flower-6973184_960_720.jpg",
  };
  return (
    <>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        <div className="cartContainer">
          <CartItemCard item={item} />
          <div className="cartInput">
            <button className="btn">-</button>
            <input type="number" value={item.quantity} readOnly />
            <button className="btn">+</button>
          </div>
          <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
        </div>
        <div className="cartGrossTotal">
          <div></div>
          <div className="cartGrossTotalBox">
            <p>Gross Total</p>
            <p>{`₹600`}</p>
          </div>
          <div></div>
          <div className="checkOutBtn">
            <button className="btn">Check out</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
