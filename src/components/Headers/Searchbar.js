import React from "react";
import SearchImg from "./img/search.png";
import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div id="searchbar">
      <div id="logo" className="searchItems">
        Trade X
      </div>
      <div id="search" className="searchItems">
        <form role="search">
          <input type="text" placeholder="Search" name="search" />
          <button type="submit">
            <img src={SearchImg} alt="search"></img>
          </button>
        </form>
      </div>
      <div className="userInfo searchItems"></div>
    </div>
  );
};

export default Searchbar;
