import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, logOut, refreshUser } from './operations';

export interface AuthState {
  token: string | null;
  user: string | null;
  isSignedIn: boolean;
  isRefreshing?: boolean;
  loading: {
    signIn: boolean;
  };
}

interface AuthPayload {
  accessToken: string;
  email: string;
}

const handleRejected = (state: AuthState) => {
  state.loading = {
    signIn: false,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: <AuthState>{
    token: null,
    user: null,
    isSignedIn: false,
    loading: {
      signIn: false,
    },
  },
  reducers: {
    setSignOut: (state: AuthState) => {
      state.isSignedIn = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.loading.signIn = true;
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<AuthPayload>) => {
          state.token = action.payload.accessToken;
          state.user = action.payload.email;
          state.isSignedIn = true;
          state.loading.signIn = false;
        }
      )
      .addCase(signIn.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => {
        state.token = null;
        state.isSignedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(
        refreshUser.fulfilled,
        (state, action: PayloadAction<AuthPayload>) => {
          state.token = action.payload.accessToken;
          state.user = action.payload.email;
          state.isSignedIn = true;
          state.isRefreshing = false;
        }
      )
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const { setSignOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
