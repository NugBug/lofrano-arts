import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import CustomButton from "../custom-button/custom-button.component.jsx";

import "./collection-item.stylse.scss";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl, forSale } = item;
  
  return (
    <div className={`${forSale ? "for-sale" : ""} collection-item`}>
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton className="custom-button" onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = {
  addItem: (item) => addItem(item),
};

export default connect(null, mapDispatchToProps)(CollectionItem);
