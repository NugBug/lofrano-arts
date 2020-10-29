import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import CustomButton from "../custom-button/custom-button.component.jsx";
import Modal from "../../components/modal/modal.component.jsx";
import { capitalLetter } from "../../utils/capitalLetter.utils";
import { selectIsAdmin } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

import "./collection-item.stylse.scss";

const CollectionItem = ({ item, addItem, collection, isAdmin }) => {
  const { name, price, forSale, thumbUrl } = item;
  const [isShowing, setIsShowing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const bodyStyle = document.body.style;
    if (isShowing) {
      bodyStyle.touchAction = "none";
      bodyStyle.scrollBehavior = "none";
      bodyStyle.overflow = "hidden";
    } else {
      bodyStyle.touchAction = "";
      bodyStyle.overflow = "";
      bodyStyle.scrollBehavior = "";
    }
  });

  return (
    <div className={`${forSale ? "for-sale" : ""} collection-item`}>
      <Modal
        className="modal"
        item={item}
        collection={collection}
        show={isShowing}
        close={() => setIsShowing(false)}
      ></Modal>
      <div
        onClick={() => {
          setIsShowing(true);
        }}
        className="image-container"
      >
        <div
          className="image-loader"
          style={{ visibility: isLoaded ? "hidden" : "visible " }}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <LazyLoad once={true}>
          <img
            onLoad={() => {
              setIsLoaded(true);
            }}
            className="image full"
            style={{ opacity: isLoaded ? 1 : 0 }}
            alt={name}
            src={thumbUrl}
          />
        </LazyLoad>
      </div>
      <div className="collection-footer">
        {isAdmin ? (
          <span className="name">
            <span
              className={`name_copy name_copy--${
                !isInputActive ? "active" : "hidden"
              }`}
            >
              {capitalLetter(name)}
            </span>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`inline-text_input inline-text_input--${
                isInputActive ? "active" : "hidden"
              }`}
            />
          </span> // Need to make sure we have unique id's in DB for all images before we finish this feature
        ) : (
          <span className="name">{capitalLetter(name)}</span>
        )}
        {!forSale ? (
          <span className="price"></span>
        ) : (
          <span className="price">{price}</span>
        )}
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

const mapStateToProps = createStructuredSelector({
  isAdmin: selectIsAdmin,
});

const mapDispatchToProps = {
  addItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
