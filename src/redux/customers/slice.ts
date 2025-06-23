import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCustomers } from './operations';

export interface Customer {
  _id?: string;
  image: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
}

export interface CustomersResponse {
  status: number;
  message: string;
  page?: number;
  perPage?: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  data: Customer[];
}

export interface CustomersState {
  data: Customer[] | null;
  page?: number;
  totalPages?: number;
  loading: {
    customer: boolean;
  };
}

const handleRejected = (state: CustomersState) => {
  state.loading = {
    customer: false,
  };
};

const customersSlice = createSlice({
  name: 'customers',
  initialState: <CustomersState>{
    data: null,
    page: 1,
    totalPages: 1,
    loading: {
      customer: false,
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCustomers.pending, state => {
        state.loading.customer = true;
      })
      .addCase(
        getCustomers.fulfilled,
        (state, action: PayloadAction<CustomersResponse>) => {
          state.data = action.payload.data;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
          state.loading.customer = false;
        }
      )
      .addCase(getCustomers.rejected, handleRejected);
  },
});

export const customersReducer = customersSlice.reducer;
