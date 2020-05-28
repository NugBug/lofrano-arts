import React from "react";
import instagramLogo from "../../assets/Instagram_logo.png";

import "./footer.styles.scss";

const Footer = () => (
  <div className="footer">
    <div className="footer-left footer-text">
      <a href="https://www.instagram.com/jloafrano/" target="blank">
        <img
          className="social-media-logo"
          src={instagramLogo}
          alt="instagram-account"
        ></img>
      </a>
    </div>
    <div className="footer-right footer-text">
      <p>Terms and Privacy</p>
      <p>Contact</p>
    </div>
    <div className="footer-bottom footer-text">
      <p>Copyright © Lofrano Arts 2020</p>
    </div>
  </div>
);

export default Footer;
