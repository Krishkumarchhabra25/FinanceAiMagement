import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { WalletRequest, WalletResponse, WalletData } from "@/types/wallet";
import {
  createWalletAccount,
  deleteWalletAccount,
  getAllAcounts,
  getWalletDetails,
  updateWalletAccount,
} from "@/api/api-service";

interface WalletState {
  walletData: WalletResponse | null; // For single wallet creation response
  allwallets: WalletData[]; // For all fetched wallets
    walletDetails: WalletData | null; // ✅ For details page

  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  walletData: null,
  allwallets: [],
    walletDetails: null, // ✅ Init

  loading: false,
  error: null,
};

// CREATE WALLET
export const createWallet = createAsyncThunk<
  WalletResponse,
  WalletRequest,
  { rejectValue: string }
>("wallet/createWallet", async (walletData, { rejectWithValue }) => {
  try {
    const response = await createWalletAccount(walletData);
    return response; // returns WalletResponse { message, data }
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// FETCH ALL WALLETS
export const fetchAllWallets = createAsyncThunk<
  WalletData[],
  void,
  { rejectValue: string }
>("wallet/fetchAllWallets", async (_, { rejectWithValue }) => {
  try {
    const response: WalletData[] = await getAllAcounts();
    return response; // direct WalletData[]
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// UPDATE WALLET
export const updateWallet = createAsyncThunk<
  WalletResponse,
  { id: string; walletData: WalletRequest },
  { rejectValue: string }
>("wallet/editWallet", async ({ id, walletData }, { rejectWithValue }) => {
  try {
    const response = await updateWalletAccount(id, walletData); // returns WalletResponse { message, data }
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteWallet = createAsyncThunk<
  { message: string }, // response type
  string,              // wallet ID
  { rejectValue: string }
>("wallet/deleteWallet", async (id, { rejectWithValue }) => {
  try {
    const response = await deleteWalletAccount(id);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// FETCH WALLET DETAILS
export const fetchWalletDetails = createAsyncThunk<
  WalletData, // return single wallet
  string,     // wallet ID
  { rejectValue: string }
>("wallet/fetchWalletDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await getWalletDetails(id);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE WALLET
      .addCase(createWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.walletData = action.payload; // WalletResponse
      })
      .addCase(createWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH ALL WALLETS
      .addCase(fetchAllWallets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWallets.fulfilled, (state, action) => {
        state.loading = false;
        state.allwallets = action.payload; // WalletData[]
      })
      .addCase(fetchAllWallets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE WALLET
      .addCase(updateWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWallet.fulfilled, (state, action) => {
        state.loading = false;
        const updatedWallet = action.payload.data; // ✅ Fix: get from .data
        if (updatedWallet && updatedWallet._id) {
          // extra safety check
          const index = state.allwallets.findIndex(
            (wallet) => wallet._id === updatedWallet._id
          );
          if (index !== -1) {
            state.allwallets[index] = updatedWallet;
          }
        }
      })

      .addCase(updateWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

          // DELETE WALLET
    .addCase(deleteWallet.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteWallet.fulfilled, (state, action) => {
      state.loading = false;
      // Remove deleted wallet from allwallets
      state.allwallets = state.allwallets.filter(
        (wallet) => wallet._id !== action.meta.arg // arg is wallet ID
      );
    })
    .addCase(deleteWallet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // FETCH WALLET DETAILS
    .addCase(fetchWalletDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchWalletDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.walletDetails = action.payload; // single wallet
    })
    .addCase(fetchWalletDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  },
});

export default walletSlice.reducer;
