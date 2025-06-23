import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DeleteSupplierResponse, SuppliersResponse } from './slice';

export interface SupplierError {
  message: string;
  statusCode?: number;
}

export interface SupplierState {
  page?: number;
  filters?: string;
}

interface Supplier {
  id?: string;
  name: string;
  address: string;
  suppliers: string;
  date: string;
  status: string;
}

export const getSuppliers = createAsyncThunk<
  SuppliersResponse,
  SupplierState,
  { rejectValue: SupplierError }
>('supplier/get', async ({ page = 1, filters = '' }, thunkAPI) => {
  try {
    const res = await axios.get<SuppliersResponse>('suppliers', {
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

export const addSuppliers = createAsyncThunk<
  SuppliersResponse,
  Supplier,
  { rejectValue: SupplierError }
>('supplier/add', async (data, thunkAPI) => {
  try {
    const res = await axios.post<SuppliersResponse>('suppliers', data);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});

export const editSupplier = createAsyncThunk<
  SuppliersResponse,
  Supplier,
  { rejectValue: SupplierError }
>('supplier/edit', async (data, thunkAPI) => {
  try {
    const res = await axios.put<SuppliersResponse>(
      `suppliers/${data.id}`,
      data
    );
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});

export const deleteSupplier = createAsyncThunk<
  DeleteSupplierResponse,
  string,
  { rejectValue: SupplierError }
>('supplier/del', async (id, thunkAPI) => {
  try {
    const res = await axios.delete<DeleteSupplierResponse>(`suppliers/${id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'Unknown error');
  }
});
