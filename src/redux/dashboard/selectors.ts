import { RootState } from '../store';

export const selectDasboardData = (state: RootState) => state.dashboard.data;
export const selectDasboardLoading = (state: RootState) =>
  state.dashboard.loading;
