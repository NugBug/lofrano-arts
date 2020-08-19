import React from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component.jsx";
import { selectCollection } from "../../redux/gallery/gallery.selectors.js";
import { selectCartTotal } from "../../redux/cart/cart.selectors";
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
          {collection.items.length === 0 ? (
            collection.title !== "musings" ? (
              <div className="placeholder-container">
                <h2 className="collection-placeholder">Check back soon</h2>
              </div>
            ) : (
              <div className="placeholder-container">
                <h2>
                  Musings are what I call things or images that connect to me.
                  They are usually objects or images that I come upon randomly
                  and it catches my attention. It could be a crumpled box, a
                  log, a shadow, or a matchbook on the sidewalk, actually
                  anything. The following are some things that have spoken to
                  me…. some inspiring me in the creation of my artworks.
                </h2>
                <h2 className="collection-placeholder">Check back soon</h2>
              </div>
            )
          ) : collection.title !== "musings" ? (
            <div className="items">
              {collection.items.map((item) => (
                <CollectionItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div>
              <div className="items">
                {collection.items.map((item) => (
                  <CollectionItem key={item.id} item={item} />
                ))}
              </div>
              <div className="placeholder-container">
                <h2>
                  Musings are what I call things or images that connect to me.
                  They are usually objects or images that I come upon randomly
                  and it catches my attention. It could be a crumpled box, a
                  log, a shadow, or a matchbook on the sidewalk, actually
                  anything. The following are some things that have spoken to
                  me…. some inspiring me in the creation of my artworks.
                </h2>
                <h2 className="collection-placeholder">Check back soon</h2>
              </div>
            </div>
          )}
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
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(CollectionPage);
