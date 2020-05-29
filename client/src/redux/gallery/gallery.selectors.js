import { createSelector } from "reselect";

const selectGallery = (state) => state.gallery;

export const selectCollections = createSelector(
  [selectGallery],
  (gallery) => gallery.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

export const selectIsCollectionFetching = createSelector(
  [selectGallery],
  (gallery) => gallery.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectGallery],
  gallery => !!gallery.collections
)