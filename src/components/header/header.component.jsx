import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/LofranoArtsCustomLogo.png";

import "./header.styles.scss";

const Header = () => (
  <div className="header">
    <Link className="logo-container" to="/">
      <img className="logo" src={Logo} alt="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        Shop
      </Link>
      <Link className="option" to="/contact">
        Cotnact
      </Link>
    </div>
  </div>
);

export default Header;
