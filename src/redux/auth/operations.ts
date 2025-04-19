import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface User {
  email: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isRefreshing: boolean;
  isSignedIn: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
  statusCode?: number;
}

axios.defaults.baseURL = 'https://vocab-builder-backend.p.goit.global/api';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signIn = createAsyncThunk<
  AuthResponse,
  Credentials,
  { rejectValue: AuthError }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post<AuthResponse>('users/signin', credentials);

    setAuthHeader(res.data.accessToken);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('users/signout');
      clearAuthHeader();
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);

export const refreshUser = createAsyncThunk<
  User,
  void,
  { state: RootState; rejectValue: string } // Доступ к стейту и тип ошибки
>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('No token available');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('users/current');
      return res.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      if (token) return true;

      return false;
    },
  }
);
