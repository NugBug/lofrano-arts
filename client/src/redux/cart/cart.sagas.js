import { all, call, takeLatest, put, select } from "redux-saga/effects";
import UserActionTypes from "../user/user.types.js";
import { setCartFromFirebase, clearCart } from "./cart.actions.js";
import { getUserCartRef } from "../../firebase/firebase.utils";
import { selectCurrentUser, selectHasSession } from "../user/user.selectors";
import { selectCartItems } from "./cart.selectors";
import CartActionTypes from "./cart.types";
import { confirmAlert } from "../../utils/confirm-alert/confirm-alert.utils.jsx";
import "../../utils/confirm-alert/react-confirm-alert.css";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);
      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

export function* checkCartFromFirebase({ payload: user }) {
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();

  const hasSession = yield select(selectHasSession);
  if (!hasSession) {
    yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
  }

  yield call(updateCartInFirebase);
}

export function* itemAddedConfirmation() {
  yield confirmAlert({
    title: "Your item has been added!",
    buttons: [
      {
        label: "Continue",
      },
    ],
  });
}

export function* onSignOutSucess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART,
    ],
    updateCartInFirebase
  );
}

export function* cartUpdated() {
  yield takeLatest(CartActionTypes.ADD_ITEM, itemAddedConfirmation);
}

export function* cartSagas() {
  yield all([
    call(onSignOutSucess),
    call(onCartChange),
    call(onUserSignIn),
    call(cartUpdated),
  ]);
}
