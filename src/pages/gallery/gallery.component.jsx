import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/gallery/gallery.selectors.js";
import { createStructuredSelector } from "reselect";
import { fetchCollectionsStartAsync } from "../../redux/gallery/shops.actions.js";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component.jsx";
import CollectionPage from "../collection/collection.component.jsx";
import WithSpinner from "../../components/with-spinner/with-spinner.component.jsx";

// Wrap necessary components with spinner component
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class GalleryPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;

    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionsFetching, isCollectionsLoaded } = this.props;

    return (
      <div className="gallery-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionsFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionsFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = {
  fetchCollectionsStartAsync: () => fetchCollectionsStartAsync(),
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage);
