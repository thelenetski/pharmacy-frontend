import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrder } from './operations';

export interface Order {
  _id: string;
  photo: string;
  name: string;
  address: string;
  products: number;
  price: number;
  status:
    | 'Pending'
    | 'Processing'
    | 'Confirmed'
    | 'Shipped'
    | 'Delivered'
    | 'Completed'
    | 'Cancelled';
  order_date: string;
}

export interface OrdersResponse {
  status: number;
  message: string;
  page?: number;
  perPage?: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  data: Order[];
}

export interface OrderState {
  data: Order[] | null;
  page?: number;
  totalPages?: number;
  loading: {
    order: boolean;
  };
}

const handleRejected = (state: OrderState) => {
  state.loading = {
    order: false,
  };
};

const orderSlice = createSlice({
  name: 'order',
  initialState: <OrderState>{
    data: null,
    page: 1,
    totalPages: 1,
    loading: {
      order: false,
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOrder.pending, state => {
        state.loading.order = true;
      })
      .addCase(
        getOrder.fulfilled,
        (state, action: PayloadAction<OrdersResponse>) => {
          state.data = action.payload.data;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
          state.loading.order = false;
        }
      )
      .addCase(getOrder.rejected, handleRejected);
  },
});

export const orderReducer = orderSlice.reducer;
