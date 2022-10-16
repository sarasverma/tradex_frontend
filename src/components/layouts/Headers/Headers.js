import React from "react";
import { Link } from "react-router-dom";
import "./Headers.css";
import Searchbar from "./Searchbar";
import { ImUser } from "react-icons/im";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";

const Headers = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <header>
      <Searchbar />
      <nav className="navbar" id="navbar">
        <ul className="navList">
          <li className="navItems">
            <Link className="navLink" to="/">
              Home
            </Link>
          </li>
          <li className="navItems">
            <Link className="navLink" to="/about">
              About us
            </Link>
          </li>
          <li className="navItems">
            <Link className="navLink" to="/service">
              Service
            </Link>
          </li>
          <li className="navItems">
            <Link className="navLink" to="/contact">
              Contact us
            </Link>
          </li>
          <li className="navItems auth">
            {isAuthenticated ? (
              <UserOptions user={user} />
            ) : (
              <Link className="navLink" to="/auth">
                <ImUser />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Headers;
