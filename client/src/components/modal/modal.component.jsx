import React from "react";
import CustomButton from "../custom-button/custom-button.component";

import "./modal.styles.scss";

const Modal = ({ name, imageUrl, show, close }) => {
  return (
    <div className="modal">
      <div
        className="modal-wrapper"
        style={{
          transform: show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        <div className="modal-header">
          <h3>{name}</h3>
          <span className="close-modal-btn" onClick={close}>
            ×
          </span>
        </div>
        <div
          className="modal-body"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className="modal-footer">
          <CustomButton className="btn-purchase">Purchase</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
