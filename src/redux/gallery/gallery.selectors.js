import { createSelector } from "reselect";

const COLLECTION_ID_MAP = {
  sculptures: 1,
  photography: 2,
  paintings: 3,
  sketches: 4,
  prints: 5,
};

const selectGallery = (state) => state.gallery;

export const selectCollections = createSelector(
  [selectGallery],
  (gallery) => gallery.collections
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
  );
