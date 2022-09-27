import React from "react";
import { useState } from "react";
import SearchImg from "./img/search.png";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div id="searchbar">
      <div id="logo" className="searchItems">
        Trade X
      </div>
      <div id="search" className="searchItems">
        <form role="search" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search"
            name="search"
            onChange={(e) => setKeyword(e.target.value)}
          />
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
