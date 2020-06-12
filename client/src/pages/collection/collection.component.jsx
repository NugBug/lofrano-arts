import React from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component.jsx";
import { selectCollection } from "../../redux/gallery/gallery.selectors.js";
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
          <div className="items">
            {collection.items.map((item) => (
              <CollectionItem key={item.id} item={item} />
            ))}
          </div>
          <div className="back-button">
            <Link className="back-arrow" to="/gallery">
              &#10094;&nbsp;Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
