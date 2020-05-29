import React from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component.jsx";
import { selectCollection } from "../../redux/gallery/gallery.selectors.js";
import { Link } from "react-router-dom";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="items">
        {
          items.map(item => <CollectionItem key={item.id} item={item} />)
        }
      </div>
      <div className="back-button">
        <Link className="back-arrow" to="/gallery">&#10094;&nbsp;Return</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
