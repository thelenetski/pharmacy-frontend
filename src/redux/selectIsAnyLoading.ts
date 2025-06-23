import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectIsAnyLoading = createSelector(
  (state: RootState) => state.order.loading.order,
  (state: RootState) => state.product.loading.product,
  (state: RootState) => state.supplier.loading.supplier,
  (state: RootState) => state.customers.loading.customer,
  (orderLoading, productLoading, supplierLoading, customersLoading) =>
    orderLoading || productLoading || supplierLoading || customersLoading
);
