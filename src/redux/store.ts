import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './WalletSlice';
import CardReducer from "./CardSlice"
export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    card:CardReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;