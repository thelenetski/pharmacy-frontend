import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface User {
  email: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
}

export interface AuthResponse {
  data: { accessToken: string; email: string };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isRefreshing?: boolean;
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

axios.defaults.baseURL = 'https://pharmacy-backend-jmat.onrender.com/api';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signIn = createAsyncThunk<
  AuthResponse,
  Credentials,
  { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post<AuthResponse>('user/login', credentials, {
      withCredentials: true,
    });

    setAuthHeader(res.data.data.accessToken);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<AuthError>;
    if (error.response?.data?.message) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('user/logout');
      clearAuthHeader();
    } catch (err) {
      const error = err as AxiosError<AuthError>;
      if (error.response?.data?.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error.message || 'Unknown error');
    }
  }
);

export const refreshUser = createAsyncThunk<
  AuthResponse,
  void,
  { state: RootState; rejectValue: string }
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
      const res = await axios.post(
        'user/refresh',
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      const error = err as AxiosError<AuthError>;
      if (error.response?.data?.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
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
