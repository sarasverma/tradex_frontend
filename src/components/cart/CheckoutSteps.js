import { Typography, Stepper, Step, StepLabel } from "@mui/material";
import React from "react";
import { MdOutlinePayment } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    { label: <Typography>Shipping Details</Typography>, icon: <FaTruck /> },
    { label: <Typography>Confirm Order</Typography>, icon: <GiConfirmed /> },
    { label: <Typography>Payment</Typography>, icon: <MdOutlinePayment /> },
  ];
  const stepStyles = {
    boxSizing: "bordr-box",
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{ color: activeStep >= index ? "orange" : "gray" }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
