import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title={"Confirm order"} />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <h3>Shipping info</h3>
            <div className="confirmshippingAreaBox">
              <div>
                <h5>Name :</h5>
                <span>{user.name}</span>
              </div>
              <div>
                <h5>Phone :</h5>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <h5>Address :</h5>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <h3>Your cart items:</h3>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {" "}
                      {item.quantity} X {item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {"   "}
        <div>
          <div className="orderSummary">
            <h3>Order Summary</h3>
            <div>
              <p>Subtotal : </p>
              <span>₹{subtotal}</span>
            </div>
            <div>
              <p>Shipping Charges : </p>
              <span>₹{shippingCharges}</span>
            </div>
            <div>
              <p>GST : </p>
              <span>₹{tax}</span>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total : </b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button className="btn" onClick={proceedToPayment}>
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
