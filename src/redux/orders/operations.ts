import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrdersResponse } from './slice';

export interface OrderError {
  message: string;
  statusCode?: number;
}

export const getOrder = createAsyncThunk<
  OrdersResponse,
  void,
  { rejectValue: OrderError }
>('order', async (_, thunkAPI) => {
  try {
    const res = await axios.get<OrdersResponse>('orders');
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});
