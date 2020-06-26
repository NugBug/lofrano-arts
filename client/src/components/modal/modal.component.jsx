import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import { addItem } from "../../redux/cart/cart.actions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { selectIsAdmin } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import DeleteItem from "../delete-item/delete-item.coponent";
import { capitalLetter } from "../../utils/capitalLetter.utils";

import "./modal.styles.scss";

const Modal = ({ show, close, addItem, item, isAdmin }) => {
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
        <h3>{capitalLetter(name)}</h3>
        <span className="close-modal-btn" onClick={close}>
          ×
        </span>
      </div>
      <div className="modal-body" onClick={close}>
        <div
          className="modal-load-container"
          style={{ visibility: isLoaded ? "hidden" : "visible " }}
        >
          <div className="modal-loader">
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
        {isAdmin ? <DeleteItem item={item} /> : null}
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

const mapStateToProps = createStructuredSelector({
  isAdmin: selectIsAdmin,
});

const mapDispatchToProps = {
  addItem: (item) => addItem(item),
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
