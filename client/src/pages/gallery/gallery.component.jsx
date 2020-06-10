import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/gallery/gallery.actions";
import Spinner from "../../components/spinner/spinner.component.jsx";

const Directory = lazy(() =>
  import("../../components/directory/directory.component.jsx")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container.jsx")
);

const GalleryPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="gallery-page">
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
        <Route exact path={`${match.path}`} component={Directory} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
      {/* </Profiler> */}
    </div>
  );
};

const mapDispatchToProps = {
  fetchCollectionsStart: () => fetchCollectionsStart(),
};

export default connect(null, mapDispatchToProps)(GalleryPage);
