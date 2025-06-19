import { RootState } from '../store';

export const selectProductData = (state: RootState) => state.product.data;
export const selectProductCats = (state: RootState) => state.product.cats;
export const selectProductPage = (state: RootState) => state.product.page;
export const selectProductTotalPages = (state: RootState) =>
  state.product.totalPages;
export const selectProductLoading = (state: RootState) => state.product.loading;
