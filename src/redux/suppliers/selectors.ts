import { RootState } from '../store';

export const selectSuppliersData = (state: RootState) => state.supplier.data;
export const selectSuppliersPage = (state: RootState) => state.supplier.page;
export const selectSuppliersTotalPages = (state: RootState) =>
  state.supplier.totalPages;
export const selectSuppliersLoading = (state: RootState) =>
  state.supplier.loading;
