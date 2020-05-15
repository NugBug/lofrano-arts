import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component.jsx";
import CollectionPage from "../collection/collection.component.jsx";

const GalleryPage = ({ match }) => (
  <div className="gallery-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
  </div>
);

export default GalleryPage;
