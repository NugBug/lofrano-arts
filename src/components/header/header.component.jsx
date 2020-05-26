import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors.js";
import { selectCurrentUser } from "../../redux/user/user.selectors.js";
import { signOutStart } from "../../redux/user/user.actions.js";
import { ReactComponent as Logo } from "../../assets/LofranoArtsCustomLogo.svg";
import CartIcon from "../cart-icon/cart-icon.component.jsx";
import CartDropdown from "../cart-dropdown/cart-dropdown.component.jsx";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles.jsx";

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/homepage">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/homepage">HOME</OptionLink>
      <OptionLink to="/gallery">GALLERY</OptionLink>
      <OptionLink to="/about">ABOUT</OptionLink>
      {currentUser ? (
        <OptionLink to="/" onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = {
  signOutStart: () => signOutStart(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
