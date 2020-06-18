import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import instagramLogo from "../../assets/Instagram_logo.png";

import "./footer.styles.scss";

const Footer = () => {
  const location = useLocation().pathname;

  return (
    <div
      className={
        location === "/" || location === "/about"
          ? `footer-homepage footer`
          : `footer`
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
        <Link exact to="/privacy">
          Terms and Privacy
        </Link>
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
};

export default Footer;
