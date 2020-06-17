import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/gallery/gallery.actions";
import Spinner from "../../components/spinner/spinner.component.jsx";
import NotFoundPage from "../../components/notFoundPage/notFoundPage.component.jsx";
import { Helmet } from "react-helmet";

const Directory = lazy(() =>
  import("../../components/directory/directory.component.jsx")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container.jsx")
);

const GalleryPage = ({ fetchCollectionsStart, collections, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="gallery-page">
      <Helmet>
        <title>Lofrano Arts - Art Gallery</title>
        <meta
          name="description"
          content="Explore the work of James Lofrano, a native San Franciscan and lifelong artist."
        />
      </Helmet>
      {/* // import React Profiler and uncomment this code to use the profiler
      <Profiler
        id="gallery-directory"
        onRender={(id, phase, actualDuration) => {
          console.log({
            id,
            phase,
            actualDuration,
          });
        }}
      > */}
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={`${match.path}`} component={Directory} />
          <Route
            exact
            path={`${match.path}/:collectionId`}
            component={CollectionPageContainer}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
      {/* </Profiler> */}
    </div>
  );
};

const mapDispatchToProps = {
  fetchCollectionsStart: () => fetchCollectionsStart(),
};

export default connect(null, mapDispatchToProps)(GalleryPage);
