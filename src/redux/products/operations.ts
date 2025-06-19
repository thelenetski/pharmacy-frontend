import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DeleteProductResponse, ProductsResponse } from './slice';

export interface ProductError {
  message: string;
  statusCode?: number;
}

export interface ProductState {
  page?: number;
  filters?: string;
}

interface Product {
  id?: string;
  name: string;
  category: string;
  suppliers: string;
  stock: number;
  price: number;
}

export const getProducts = createAsyncThunk<
  ProductsResponse,
  ProductState,
  { rejectValue: ProductError }
>('product/get', async ({ page = 1, filters = '' }, thunkAPI) => {
  try {
    const res = await axios.get<ProductsResponse>('products', {
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

export const addProduct = createAsyncThunk<
  ProductsResponse,
  Product,
  { rejectValue: ProductError }
>('product/add', async (data, thunkAPI) => {
  try {
    const res = await axios.post<ProductsResponse>('products', data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});

export const editProduct = createAsyncThunk<
  ProductsResponse,
  Product,
  { rejectValue: ProductError }
>('product/edit', async (data, thunkAPI) => {
  try {
    const res = await axios.put<ProductsResponse>(`products/${data.id}`, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});

export const deleteProduct = createAsyncThunk<
  DeleteProductResponse,
  string,
  { rejectValue: ProductError }
>('product/del', async (id, thunkAPI) => {
  try {
    const res = await axios.delete<DeleteProductResponse>(`products/${id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});
