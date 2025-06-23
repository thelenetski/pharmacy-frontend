import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const loadingSelectors = [
  (state: RootState) => state.order.loading.order,
  (state: RootState) => state.product.loading.product,
  (state: RootState) => state.supplier.loading.supplier,
  (state: RootState) => state.customers.loading.customer,
];

export const selectIsAnyLoading = createSelector(
  loadingSelectors,
  (...loadings) => loadings.some(Boolean)
);
