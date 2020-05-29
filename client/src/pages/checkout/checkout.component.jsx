import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CheckoutItem from "../../components/checkout-item/checkout-item.component.jsx";
import StripeCheckoutButton from "../../components/stripe-button/strip-button.component.jsx";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors.js";

import "./checkout.styles.scss";

const CheckoutPage = ({ cartItems, total }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}

    <div className="total">
      <span>TOTAL: ${total}</span>
    </div>
    <div className="button">
      <StripeCheckoutButton price={total} />
    </div>
    <div className="test-warning">
      <h3>*Please use the following credit card for testing payment functionality*</h3>
      <h3>4242-4242-4242-4242 -- Exp: 01/21 -- CW: 123</h3>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
