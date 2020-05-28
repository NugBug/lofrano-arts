import React from "react";
import CustomButton from "../custom-button/custom-button.component.jsx";

import "./error-message.styles.scss";

const WithErrorMessage = (WrappedComponent) => {
  const Error = ({ error, resetForm, ...otherProps }) => {
    return error !== null ? (
      <div className="error-overlay">
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
