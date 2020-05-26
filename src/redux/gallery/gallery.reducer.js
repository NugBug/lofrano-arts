import GalleryActionTypes from "./gallery.types.js";

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

const galleryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GalleryActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case GalleryActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload,
      };
    case GalleryActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default galleryReducer;
