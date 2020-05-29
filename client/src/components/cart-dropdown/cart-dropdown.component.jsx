import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { selectCartItems } from "../../redux/cart/cart.selectors.js";
import { toggleCartHidden } from "../../redux/cart/cart.actions.js";
import { selectCurrentUser } from "../../redux/user/user.selectors.js";
import CustomButton from "../custom-button/custom-button.component.jsx";
import CartItem from "../cart-item/cart-item.component.jsx";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({
  cartItems,
  history,
  toggleCartHidden,
  currentUser,
}) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItems.id} item={cartItem} />
        ))
      ) : (
        <div className="empty-message">Your cart is empty</div>
      )}
    </div>
    {currentUser ? (
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          toggleCartHidden();
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    ) : (
      <CustomButton
        style={{ fontSize: "12px" }}
        onClick={() => {
          history.push("/signin");
          toggleCartHidden();
        }}
      >
        Sign in to Checkout
      </CustomButton>
    )}
  </div>
);

const mapDispatchToProps = {
  toggleCartHidden: () => toggleCartHidden(),
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  currentUser: selectCurrentUser,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
