import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/gallery/gallery.actions";
import CollectionPageContainer from "../collection/collection.container.jsx";
import Directory from "../../components/directory/directory.component.jsx";

const GalleryPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="gallery-page">
      <Route
        exact
        path={`${match.path}`}
        component={Directory}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = {
  fetchCollectionsStart: () => fetchCollectionsStart(),
};

export default connect(null, mapDispatchToProps)(GalleryPage);
