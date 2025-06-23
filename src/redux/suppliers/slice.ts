import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addSuppliers,
  deleteSupplier,
  editSupplier,
  getSuppliers,
} from './operations';

export interface Supplier {
  _id: string;
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
}

export interface SuppliersResponse {
  status: number;
  message: string;
  page?: number;
  perPage?: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  data: Supplier[];
  categories: string[];
}

export interface DeleteSupplierResponse {
  status: number;
  message: string;
  data: string;
}

export interface SupplierState {
  data: Supplier[] | null;
  cats: string[] | null;
  page?: number;
  totalPages?: number;
  loading: {
    supplier: boolean;
    add: boolean;
  };
}

const handleRejected = (state: SupplierState) => {
  state.loading = {
    supplier: false,
    add: false,
  };
};

const supplierSlice = createSlice({
  name: 'supplier',
  initialState: <SupplierState>{
    data: null,
    page: 1,
    totalPages: 1,
    loading: {
      supplier: false,
      add: false,
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSuppliers.pending, state => {
        state.loading.supplier = true;
      })
      .addCase(
        getSuppliers.fulfilled,
        (state, action: PayloadAction<SuppliersResponse>) => {
          state.data = action.payload.data;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
          state.loading.supplier = false;
        }
      )
      .addCase(getSuppliers.rejected, handleRejected)
      .addCase(addSuppliers.pending, state => {
        state.loading.add = true;
      })
      .addCase(addSuppliers.fulfilled, state => {
        state.loading.add = false;
      })
      .addCase(addSuppliers.rejected, handleRejected)
      .addCase(editSupplier.pending, state => {
        state.loading.add = true;
      })
      .addCase(editSupplier.fulfilled, state => {
        state.loading.add = false;
      })
      .addCase(editSupplier.rejected, handleRejected)
      .addCase(deleteSupplier.pending, state => {
        state.loading.supplier = true;
      })
      .addCase(
        deleteSupplier.fulfilled,
        (state, action: PayloadAction<DeleteSupplierResponse>) => {
          if (state.data) {
            state.data = state.data.filter(
              item => item._id !== action.payload.data
            );
          }
          state.loading.supplier = false;
        }
      )
      .addCase(deleteSupplier.rejected, handleRejected);
  },
});

export const supplierReducer = supplierSlice.reducer;
