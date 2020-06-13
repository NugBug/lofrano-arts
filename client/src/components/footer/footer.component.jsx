import React from "react";
import { useLocation } from "react-router-dom";
import instagramLogo from "../../assets/Instagram_logo.png";

import "./footer.styles.scss";

const Footer = () => (
  <div
    className={
      useLocation().pathname === "/" ? `footer-homepage footer` : `footer`
    }
  >
    <div className="footer-top">
      <div className="social-media">
        <a href="https://www.instagram.com/jloafrano/" target="blank">
          <img
            className="instagram-logo"
            src={instagramLogo}
            alt="instagram-account"
          ></img>
        </a>
      </div>
      <p>Terms and Privacy</p>
      <p>
        <a href="mailto:lofranoart@gmail.com" rel="noopener noreferrer">
          Contact
        </a>
      </p>
    </div>
    <div className="footer-bottom">
      <p>Copyright © Lofrano Arts 2020</p>
    </div>
  </div>
);

export default Footer;
