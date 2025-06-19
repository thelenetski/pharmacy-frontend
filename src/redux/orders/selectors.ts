import { RootState } from '../store';

export const selectOrderData = (state: RootState) => state.order.data;
export const selectOrderPage = (state: RootState) => state.order.page;
export const selectOrderTotalPages = (state: RootState) =>
  state.order.totalPages;
export const selectOrderFilters = (state: RootState) => state.order.filters;
export const selectOrderLoading = (state: RootState) => state.order.loading;
