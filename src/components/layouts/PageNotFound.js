import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { TbError404 } from "react-icons/tb";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <>
      <div className="pageNotFound">
        <TbError404 />
        <Typography>Page not found!</Typography>
        <Link to="/" className="btn">
          Home
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
