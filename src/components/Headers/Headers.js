import React from "react";
import "./Headers.css";

const Headers = () => {
  return (
    <header>
      <nav className="navbar" id="navbar">
        <ul className="navList" id="navList">
          <li className="navItems" id="navItems">
            <a id="navLink" href="/">
              Home
            </a>
          </li>
          <li className="navItems" id="navItems">
            <a id="navLink" href="/">
              About us
            </a>
          </li>
          <li className="navItems" id="navItems">
            <a id="navLink" href="/">
              Service
            </a>
          </li>
          <li className="navItems" id="navItems">
            <a id="navLink" href="/">
              Contact us
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Headers;
