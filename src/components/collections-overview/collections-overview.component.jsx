import React from "react";
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/gallery/gallery.selectors.js";
import CollectionPreview from "../collection-preview/collectoin-preview.component.jsx";

import "./collections-overview.styles.scss";

const CollectionsOverview = ({ collections }) => (
  <div className="collectoins-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(CollectionsOverview);