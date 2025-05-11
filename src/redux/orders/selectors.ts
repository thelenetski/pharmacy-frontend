import { RootState } from '../store';

export const selectOrderData = (state: RootState) => state.order.data;
export const selectOrderLoading = (state: RootState) => state.order.loading;
