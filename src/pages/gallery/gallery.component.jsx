import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component.jsx";
import CollectionPage from "../collection/collection.component.jsx";
import WithSpinner from "../../components/with-spinner/with-spinner.component.jsx";
import { updateCollections } from "../../redux/gallery/shops.actions.js";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils.js";

// Wrap necessary components with spinner component
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class GalleryPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    collectionRef.get().then(snapshot => {
      updateCollections(convertCollectionsSnapshotToMap(snapshot));
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className="gallery-page">
        <Route 
          exact path={`${match.path}`} 
          render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} 
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateCollections: (collectionsMap) => updateCollections(collectionsMap),
};

export default connect(null, mapDispatchToProps)(GalleryPage);
