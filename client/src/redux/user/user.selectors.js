import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectSignInError = createSelector(
  [selectUser],
  (user) => user.error
);

export const selectIsUserFetching = createSelector(
  [selectUser],
  (user) => user.isFetching
);

export const selectIsLoggedIn = createSelector(
  [selectUser],
  (user) => user.loggedIn
);

export const selectHasSession = createSelector(
  [selectUser],
  (user) => user.hasSession
);

export const selectIsAdmin = createSelector(
  [selectUser],
  (user) => user.isAdmin
);
