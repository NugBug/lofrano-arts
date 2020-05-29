import { takeLatest, call, put, all } from "redux-saga/effects";
import GalleryActionTypes from "./gallery.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils.js";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "../gallery/gallery.actions.js";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  // The above code takes the following code, used in our gallery actions, and converts from Thunk to Saga
  //   collectionRef
  //     .get()
  //     .then((snapshot) => {
  //       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //       dispatch(fetchCollectionsSuccess(collectionsMap));
  //     })
  //     .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  // };
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    GalleryActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* gallerySagas() {
  yield all([call(fetchCollectionsStart)]);
}
