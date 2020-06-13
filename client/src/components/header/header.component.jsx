import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
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
  CartIconContainer,
} from "./header.styles.jsx";

const Header = ({ currentUser, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink exact to="/" activeClassName="selected">
        HOME
      </OptionLink>
      <OptionLink to="/gallery" activeClassName="selected">
        GALLERY
      </OptionLink>
      <OptionLink exact to="/about" activeClassName="selected">
        ABOUT
      </OptionLink>
      {currentUser ? (
        <OptionLink id="signOut" to="/" onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink exact to="/signin" activeClassName="selected">
          SIGN IN
        </OptionLink>
      )}
      <CartIconContainer>
        <CartIcon />
      </CartIconContainer>
    </OptionsContainer>
    <CartDropdown />
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = {
  signOutStart: () => signOutStart(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
