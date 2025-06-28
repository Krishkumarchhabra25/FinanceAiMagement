import { createTransaction, deleteTransactionById, getAllTansactions, getTransactionDetailsById, updateTransaction } from "@/api/api-service";
import type { TransactionData, TransactionListResponse, TransactionRequest, TransactionResponse } from "@/types/transaction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface TransactionState{
    transactions :TransactionData[],
    transactionDetails: TransactionData | null,
    loading:boolean,
    error: string | null
}

const initialState: TransactionState = {
  transactions: [],
  transactionDetails: null,
  loading: false,
  error: null,
};


export const fetchAllTransactions = createAsyncThunk<
  TransactionListResponse["data"],
  void,
  { rejectValue: string }
>("transaction/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await getAllTansactions();
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "Failed to fetch transactions");
  }
});

export const fetchTransactionById = createAsyncThunk<
  TransactionData,
  string,
  { rejectValue: string }
>("transaction/fetchById", async (id, thunkAPI) => {
  try {
    const res = await getTransactionDetailsById(id);
    return res.data; // ✅ extract only the transaction object
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err?.response?.data?.message || err.message || "Failed to fetch transaction"
    );
  }
});



export const createNewTransaction = createAsyncThunk<
  TransactionResponse["data"],
  TransactionRequest,
  { rejectValue: string }
>("transaction/create", async (data, thunkAPI) => {
  try {
    const res = await createTransaction(data);
    return res.data;
  } catch (err: any) {
    const message =
      err?.response?.data?.message || err.message || "Failed to create transaction";
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateExistingTransaction = createAsyncThunk<
  TransactionResponse["data"],
  { id: string; data: TransactionRequest },
  { rejectValue: string }
>("transaction/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await updateTransaction(id, data);
    return res.data;
  } catch (err: any) {
    const message =
      err?.response?.data?.message || err.message || "Failed to update transaction";
    return thunkAPI.rejectWithValue(message);
  }
});


export const deleteTransaction = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("transaction/delete", async (id, thunkAPI) => {
  try {
    await deleteTransactionById(id);
    return { id };
  } catch (err: any) {
    
  return thunkAPI.rejectWithValue(
  err?.response?.data?.message || err.message || "Failed to delete transaction"
);
  }
});


const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearTransactionDetails: (state) => {
      state.transactionDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching transactions";
      })

      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.transactionDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching transaction details";
      })

      .addCase(createNewTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createNewTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error creating transaction";
      })

      .addCase(updateExistingTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex((tx) => tx._id === action.payload._id);
        if (index !== -1) state.transactions[index] = action.payload;
        state.loading = false;
      })
      .addCase(updateExistingTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error updating transaction";
      })

      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((tx) => tx._id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error deleting transaction";
      });
  },
});

export default TransactionSlice.reducer;
