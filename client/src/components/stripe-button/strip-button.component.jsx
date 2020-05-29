import React from "react";
import { connect } from "react-redux";
import { clearCart } from "../../redux/cart/cart.actions.js";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Logo from "../../assets/LofranoArtsLogoOnly.svg";

const StripeCheckoutButton = ({ price, clearCart }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_rthG2rNduCeBJKf4d37fALDi001zeNkPRH";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment successful");
        clearCart();
      })
      .catch((error) => {
        console.log(error);
        alert(
          "There was an issue with your payment.  Please be sure you use the provided credit card."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Lofrano Arts"
      billingAddress
      shippingAddress
      image={Logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = {
  clearCart: () => clearCart(),
};

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
