import { RootState } from '../store';

export const selectCustomersData = (state: RootState) => state.customers.data;
export const selectCustomersPage = (state: RootState) => state.customers.page;
export const selectCustomersTotalPages = (state: RootState) =>
  state.customers.totalPages;
export const selectCustomersLoading = (state: RootState) =>
  state.customers.loading;
