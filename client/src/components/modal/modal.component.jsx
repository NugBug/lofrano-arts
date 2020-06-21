import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import "./modal.styles.scss";

const Modal = ({ show, close, addItem, item }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { name, price, imageUrl, forSale } = item;

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
        <div className="modal-load-container">
          <div
            className="modal-loader"
            style={{ visibility: isLoaded ? "hidden" : "visible " }}
          >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <LazyLoadImage
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
          effect="blur"
          alt={name}
          src={imageUrl}
          afterLoad={() => setIsLoaded(true)}
        />
      </div>
      <div className="modal-footer">
        {forSale ? <h3>Price: {price}</h3> : <h3>Price: --</h3>}
        {forSale ? (
          <CustomButton onClick={() => addItem(item)} className="btn-purchase">
            Add To Cart
          </CustomButton>
        ) : (
          <CustomButton className="btn-purchase">
            <Link to="/contact">Inquire</Link>
          </CustomButton>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addItem: (item) => addItem(item),
};

export default connect(null, mapDispatchToProps)(Modal);
