import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import {
  addItemToCart,
  removeItemsFromCart,
} from "../../states/actions/cartAction";
import MetaData from "../layouts/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/auth?redirect=shipping");
  };

  return (
    <>
      <MetaData title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <MdRemoveShoppingCart />
          <p>Your cart is empty</p>
          <Link to="/" className="btn">
            View products
          </Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <h4>Product</h4>
              <h4>Quantity</h4>
              <h4>Subtotal</h4>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      className="btn"
                      onClick={() => {
                        if (item.quantity > 1)
                          dispatch(
                            addItemToCart(item.product, item.quantity - 1)
                          );
                      }}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      className="btn"
                      onClick={() => {
                        if (item.quantity < item.stock)
                          dispatch(
                            addItemToCart(item.product, item.quantity + 1)
                          );
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}
            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button className="btn" onClick={checkOutHandler}>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
