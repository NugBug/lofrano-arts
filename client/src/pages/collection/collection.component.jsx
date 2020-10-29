import React from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component.jsx";
import { selectCollection } from "../../redux/gallery/gallery.selectors.js";
import { selectCartTotal } from "../../redux/cart/cart.selectors";
import { Link } from "react-router-dom";
import NotFoundPage from "../../components/notFoundPage/notFoundPage.component.jsx";
import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  return (
    <div>
      {collection === undefined ? (
        <NotFoundPage>
          {console.log("Collection undefine, try another page: ", collection)}
        </NotFoundPage>
      ) : (
        <div className="collection-page">
          <h1 className="title">{collection.title.toUpperCase()}</h1>
          {collection.items.length === 0 ? (
            <div className="placeholder-container">
              <h2 className="collection-placeholder">Check back soon</h2>
            </div>
          ) : (
            <div className="items">
              {collection.items.map((item) => (
                <CollectionItem
                  key={item.id}
                  item={item}
                  collection={collection}
                />
              ))}
            </div>
          )}
          <div className="back-button">
            <div className="arrow bounce"></div>
            <Link className="back" to="/gallery">
              Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(CollectionPage);
