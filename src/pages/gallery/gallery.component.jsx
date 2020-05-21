import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/gallery/shops.actions.js";
import CollectionsOvervieContainer from "../../components/collections-overview/collections-overview.container.jsx";
import CollectionPageContainer from "../collection/collection.container.jsx";

class GalleryPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;

    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="gallery-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOvervieContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchCollectionsStartAsync: () => fetchCollectionsStartAsync(),
};

export default connect(null, mapDispatchToProps)(GalleryPage);
