import { RootState } from '../store';

export const selectIsSignedIn = (state: RootState) => state.auth.isSignedIn;

export const selectUserInfo = (state: RootState) => state.auth.user;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectAuthToken = (state: RootState) => state.auth.token;
