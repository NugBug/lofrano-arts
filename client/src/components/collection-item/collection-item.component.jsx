import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import CustomButton from "../custom-button/custom-button.component.jsx";
import Modal from "../../components/modal/modal.component.jsx";

import "./collection-item.stylse.scss";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl, forSale } = item;
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.height = "";
    }
  });

  return (
    <div className={`${forSale ? "for-sale" : ""} collection-item`}>
      <Modal
        className="modal"
        item={item}
        show={isShowing}
        close={() => setIsShowing(false)}
      ></Modal>
      <div
        onClick={() => setIsShowing(true)}
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        className="custom-button"
        onClick={() => addItem(item)}
        inverted
      >
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = {
  addItem: (item) => addItem(item),
};

export default connect(null, mapDispatchToProps)(CollectionItem);
