import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomersResponse } from './slice';

export interface CustomerError {
  message: string;
  statusCode?: number;
}

export interface CustomerState {
  page?: number;
  filters?: string;
}

export const getCustomers = createAsyncThunk<
  CustomersResponse,
  CustomerState,
  { rejectValue: CustomerError }
>('customers/get', async ({ page = 1, filters = '' }, thunkAPI) => {
  try {
    const res = await axios.get<CustomersResponse>('customers', {
      params: { page, name: filters },
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});
