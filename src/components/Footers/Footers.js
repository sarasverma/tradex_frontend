import React from "react";
import "./Footer.css";
import Facebook from "./img/facebook.png";
import Instagram from "./img/instagram.png";
import Twitter from "./img/twitter.png";

const Footers = () => {
  return (
    <footer>
      <div className="footers">
        <div id="footLeft">
          <div className="footLinks">
            <h4>Important links</h4>
            <ul className="impLinks">
              <a href="/">Payment</a>
              <a href="/">Cancellation & returns</a>
              <a href="/">FAQ</a>
              <a href="/">Report Infrigement</a>
            </ul>
          </div>
        </div>
        <div id="footMid">
          <div className="info">
            Trade x <br />
            All rights reserved &copy; 2022.
          </div>
        </div>
        <div id="footRight">
          <div className="socials">
            <a href="/" className="socialLinks">
              <img src={Facebook} alt="facebook"></img>
            </a>
            <a href="/" className="socialLinks">
              <img src={Instagram} alt="instagram"></img>
            </a>
            <a href="/" className="socialLinks">
              <img src={Twitter} alt="twitter"></img>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
