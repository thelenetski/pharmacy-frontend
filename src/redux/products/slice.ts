import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from './operations';

export interface Product {
  _id: string;
  photo: string;
  name: string;
  address: string;
  suppliers: string;
  stock: number;
  price: number;
  category: string;
}

export interface ProductsResponse {
  status: number;
  message: string;
  page?: number;
  perPage?: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  data: Product[];
  categories: string[];
}

export interface DeleteProductResponse {
  status: number;
  message: string;
  data: string;
}

export interface ProductState {
  data: Product[] | null;
  cats: string[] | null;
  page?: number;
  totalPages?: number;
  loading: {
    product: boolean;
    add: boolean;
  };
}

const handleRejected = (state: ProductState) => {
  state.loading = {
    product: false,
    add: false,
  };
};

const productSlice = createSlice({
  name: 'product',
  initialState: <ProductState>{
    data: null,
    cats: null,
    page: 1,
    totalPages: 1,
    loading: {
      product: false,
      add: false,
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.loading.product = true;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<ProductsResponse>) => {
          state.data = action.payload.data;
          state.cats = action.payload.categories;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
          state.loading.product = false;
        }
      )
      .addCase(getProducts.rejected, handleRejected)
      .addCase(addProduct.pending, state => {
        state.loading.add = true;
      })
      .addCase(addProduct.fulfilled, state => {
        state.loading.add = false;
      })
      .addCase(addProduct.rejected, handleRejected)
      .addCase(editProduct.pending, state => {
        state.loading.add = true;
      })
      .addCase(editProduct.fulfilled, state => {
        state.loading.add = false;
      })
      .addCase(editProduct.rejected, handleRejected)
      .addCase(deleteProduct.pending, state => {
        state.loading.product = true;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<DeleteProductResponse>) => {
          if (state.data) {
            state.data = state.data.filter(
              item => item._id !== action.payload.data
            );
          }
          state.loading.product = false;
        }
      )
      .addCase(deleteProduct.rejected, handleRejected);
  },
});

export const productReducer = productSlice.reducer;
