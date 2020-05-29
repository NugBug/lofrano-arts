import React from "react";
import instagramLogo from "../../assets/Instagram_logo.png";

import "./footer.styles.scss";

const Footer = () => (
  <div className="footer">
    <div className="footer-top">
      <a href="https://www.instagram.com/jloafrano/" target="blank">
        <img
          className="social-media-logo"
          src={instagramLogo}
          alt="instagram-account"
        ></img>
      </a>
      <p>Terms and Privacy</p>
      <p><a href="mailto:lofranoart@gmail.com"  rel="noopener noreferrer">Contact</a></p>
    </div>
    <div className="footer-bottom">
      <p>Copyright © Lofrano Arts 2020</p>
    </div>
  </div>
);

export default Footer;
