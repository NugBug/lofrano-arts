import { all, call } from "redux-saga/effects";

import { gallerySagas } from "./gallery/gallery.sagas.js";
import { userSagas } from "./user/user.sagas.js";
import { cartSagas } from "./cart/cart.sagas.js"

export default function* rootSaga() {
  yield all([call(gallerySagas), call(userSagas), call(cartSagas)]);
}
