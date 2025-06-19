import { RootState } from '../store';

export const selectDasboardData = (state: RootState) => state.dashboard.data;
export const selectFilters = (state: RootState) => state.dashboard.filters;
export const selectDasboardLoading = (state: RootState) =>
  state.dashboard.loading;
