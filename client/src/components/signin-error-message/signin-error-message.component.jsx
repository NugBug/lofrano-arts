import React from "react";
import ScrollToTop from "../scroll-to-top/scroll-to-top.component.jsx";
import CustomButton from "../custom-button/custom-button.component.jsx";

import "./signin-error-message.styles.scss";

const WithErrorMessage = (WrappedComponent) => {
  const Error = ({ error, resetForm, ...otherProps }) => {
    return !!error ? (
      <div className="error-overlay">
        <ScrollToTop />
        <div className="error-message">{`${error.message}`}</div>
        <div className="button">
          <CustomButton onClick={resetForm}>Continue</CustomButton>
        </div>
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Error;
};

export default WithErrorMessage;
