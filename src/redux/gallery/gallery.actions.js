import GalleryActionTypes from "./gallery.types.js";

export const fetchCollectionsStart = () => ({
  type: GalleryActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: GalleryActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: GalleryActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

// The following Thunk code was converted to Saga and moved to gallery.sagas.js
// export const fetchCollectionsStartAsync = () => {
//   return (dispatch) => {
//     const collectionRef = firestore.collection("collections");
//     dispatch(fetchCollectionsStart());

//     collectionRef
//       .get()
//       .then((snapshot) => {
//         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//         dispatch(fetchCollectionsSuccess(collectionsMap));
//       })
//       .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
//   };
// };
