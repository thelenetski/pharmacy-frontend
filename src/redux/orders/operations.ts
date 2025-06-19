import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrdersResponse } from './slice';

export interface OrderError {
  message: string;
  statusCode?: number;
}

export interface OrderState {
  page?: number;
  filters?: string;
}

export const getOrder = createAsyncThunk<
  OrdersResponse,
  OrderState,
  { rejectValue: OrderError }
>('order', async ({ page = 1, filters = '' }, thunkAPI) => {
  try {
    const res = await axios.get<OrdersResponse>('orders', {
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
