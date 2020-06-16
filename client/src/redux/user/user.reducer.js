import UserActionTypes from "./user.types.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isFetching: false,
  loggedIn: false,
  isAdmin: false,
  hasSessionCheck: false,
};

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["loggedIn", "isAdmin", "hasSessionCheck"],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.RESET_FORM:
      return INITIAL_STATE;
    case UserActionTypes.GOOGLE_SIGN_IN_START:
    case UserActionTypes.EMAIL_SIGN_IN_START:
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        isFetching: true,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isFetching: false,
        loggedIn: true,
      };
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        hasSessionCheck: state.loggedIn,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isFetching: false,
        loggedIn: false,
        isAdmin: false,
        hasSessionCheck: false,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        loggedIn: false,
        isAdmin: false,
        hasSessionCheck: false,
        currentUser: null,
      };
    case UserActionTypes.CHECK_USER_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, userReducer);
