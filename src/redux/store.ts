import { configureStore } from '@reduxjs/toolkit';
import { modalReducer } from './modal/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';
import type { AuthState } from './auth/slice';
import { dashReducer } from './dashboard/slice';
import { orderReducer } from './orders/slice';
import { productReducer } from './products/slice';
import { supplierReducer } from './suppliers/slice';
import { customersReducer } from './customers/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isSignedIn'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer<AuthState>(authPersistConfig, authReducer),
    dashboard: dashReducer,
    order: orderReducer,
    product: productReducer,
    supplier: supplierReducer,
    customers: customersReducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
