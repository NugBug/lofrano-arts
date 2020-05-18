import React from "react";
import StripeCheckout from "react-stripe-checkout";
import Logo from "../../assets/LofranoArtsLogoOnly.svg";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_rthG2rNduCeBJKf4d37fALDi001zeNkPRH";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful")
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

export default StripeCheckoutButton;
