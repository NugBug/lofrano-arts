import { createSelector } from "reselect";

const selectGallery = (state) => state.gallery;

export const selectCollections = createSelector(
  [selectGallery],
  (gallery) => gallery.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );
