import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './WalletSlice';
import CardReducer from "./CardSlice"
import TransactionSlice from "./TransactionSlice"
export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    card:CardReducer,
    transaction: TransactionSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;