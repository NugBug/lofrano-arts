import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

import "./modal.styles.scss";

const Modal = ({ show, close, addItem, item }) => {
  const { name, price, imageUrl, forSale } = item;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
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
      <div className="modal-body" onClick={close}>
        <div
          className="modal-loader"
          style={{ visibility: isLoaded ? "hidden" : "visible " }}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <img
          onLoad={() => {
            setIsLoaded(true);
          }}
          style={{ opacity: isLoaded ? 1 : 0 }}
          className="modal-image full"
          alt={name}
          src={imageUrl}
        />
      </div>
      <div className="modal-footer">
        {forSale ? <h3>Price: {price}</h3> : <h3>Price: --</h3>}
        {forSale ? (
          <CustomButton onClick={() => addItem(item)} className="btn-purchase">
            Add To Cart
          </CustomButton>
        ) : (
          <Link to="/contact">
            <CustomButton className="btn-purchase">Inquire</CustomButton>
          </Link>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addItem: (item) => addItem(item),
};

export default connect(null, mapDispatchToProps)(Modal);
