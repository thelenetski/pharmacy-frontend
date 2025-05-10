import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DashApiResponse } from './slice';

export interface DashError {
  message: string;
  statusCode?: number;
}

export const getDash = createAsyncThunk<
  DashApiResponse,
  void,
  { rejectValue: DashError }
>('dashboard', async (_, thunkAPI) => {
  try {
    const res = await axios.get<DashApiResponse>('dashboard');
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});
