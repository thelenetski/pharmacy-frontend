import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrdersResponse } from './slice';

export interface OrderError {
  message: string;
  statusCode?: number;
}

export interface OrderState {
  page?: number;
}

export const getOrder = createAsyncThunk<
  OrdersResponse,
  OrderState,
  { rejectValue: OrderError }
>('order', async ({ page = 1 }, thunkAPI) => {
  try {
    const res = await axios.get<OrdersResponse>('orders', {
      params: { page },
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});
