import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDash } from './operations';

export interface Customer {
  _id: string;
  image?: string;
  photo?: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
}

export interface IncomeExpense {
  _id: string;
  amount: string;
  name: string;
  type: 'Income' | 'Expense' | 'Error';
}

export interface DashboardData {
  allProducts: number;
  allSuppliers: number;
  allCustomers: number;
  latestCustomers: Customer[];
  incomeExpenses: IncomeExpense[];
}

export interface DashApiResponse {
  status: number;
  message: string;
  data: DashboardData;
}

export interface DashState {
  data: DashboardData | null;
  loading: {
    dash: boolean;
  };
}

const handleRejected = (state: DashState) => {
  state.loading = {
    dash: false,
  };
};

const dashSlice = createSlice({
  name: 'dashboard',
  initialState: <DashState>{
    data: null,
    loading: {
      dash: false,
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDash.pending, state => {
        state.loading.dash = true;
      })
      .addCase(
        getDash.fulfilled,
        (state, action: PayloadAction<DashApiResponse>) => {
          state.data = action.payload.data;
          state.loading.dash = false;
        }
      )
      .addCase(getDash.rejected, handleRejected);
  },
});

export const dashReducer = dashSlice.reducer;
