import GALLERY_DATA from "./gallery.data";

const INITIAL_STATE = {
  collections: GALLERY_DATA
};

const galleryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default galleryReducer;
