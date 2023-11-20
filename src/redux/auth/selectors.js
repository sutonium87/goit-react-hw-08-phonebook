// Selector to get the isLoggedIn state from the auth slice
export const selectIsLoggedIn = state => state.auth.isLoggedIn;

// Selector to get the user state from the auth slice
export const selectUser = state => state.auth.user;

// Selector to get the isRefreshing state from the auth slice
export const selectIsRefreshing = state => state.auth.isRefreshing;

// Selector to get the isAuthLoading state from the auth slice
export const selectIsAuthLoading = state => state.auth.isAuthLoading;

// Selector to get the authError state from the auth slice
export const selectAuthError = state => state.auth.authError;
