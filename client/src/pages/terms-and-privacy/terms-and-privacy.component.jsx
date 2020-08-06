import React from "react";
import "./terms-and-privacy.styles.scss";

const TermsAndPrivacy = () => {
  return (
    <div className="privacy-statement">
      <div className="privacy-statement-text">
        <h2>Account and Profile Information</h2>
        <p>
          When you create an account with Lofrano Arts and sign-up you provide
          us with your name and email address. We do not collect any information
          about our users from a third party.
        </p>
        <div className="line-space"></div>
        <div className="line-space"></div>
        <hr></hr>
        <div className="line-space"></div>
        <div className="line-space"></div>
        <h2>Billing and Payment Information</h2>
        <p>
          All your payment information is hosted and processed securely by third
          party payment processor Stripe.com. We do not store your payment
          information or credit cards on any of our systems.
        </p>
        <div className="line-space"></div>
        <div className="line-space"></div>
        <hr></hr>
        <div className="line-space"></div>
        <div className="line-space"></div>
        <h2>How do we use the information we collect?</h2>
        <p>
          Your email and name are used strictly for authentication to access and
          make purchases on LofranoArts.com as well as to personalize your
          experience. We may at times send updates to the email address
          provided. You have the option to opt-out of such updates.
        </p>
        <div className="line-space"></div>
        <div className="line-space"></div>
        <hr></hr>
        <div className="line-space"></div>
        <div className="line-space"></div>
        <h2>How do I delete my account?</h2>
        <p>
          Please contact Lofrano Arts directly via the contact link on this
          website to request deletion of your account.
        </p>
        <div className="line-space"></div>
        <div className="line-space"></div>
        <hr></hr>
        <div className="line-space"></div>
        <div className="line-space"></div>
        <h2>Modification of Terms and Policy</h2>
        <p>
          Lofrano Arts may at any time modify the terms, conditions and policies
          noted above by notifying users through e-mail. If any modification is
          unacceptable to a user, the user may request to have his/her/their
          account deleted.
        </p>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
