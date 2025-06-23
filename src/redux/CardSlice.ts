import {
  CreateCard,
  deleteCardById,
  getAllCards,
  getCardByCardId,
  updateCard,
} from "@/api/api-service";
import type {
  CreditCardData,
  CreditCardRequest,
  CreditCardResponse,
} from "@/types/card";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CardState {
  cardData: CreditCardResponse | null;
  allCards: CreditCardData[];
  cardDetails: CreditCardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CardState = {
  cardData: null,
  allCards: [],
  cardDetails: null,
  loading: false,
  error: null,
};

// CREATE Card
export const createCard = createAsyncThunk<
  CreditCardResponse,
  CreditCardRequest,
  { rejectValue: string }
>("card/createCard", async (cardData, { rejectWithValue }) => {
  try {
    const response = await CreateCard(cardData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// FETCH ALL Cards
export const fetchAllCards = createAsyncThunk<
  CreditCardData[],
  void,
  { rejectValue: string }
>("card/fetchAllCards", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllCards();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const fetchCardByCardId = createAsyncThunk<
  CreditCardData, // expects just a card object
  string,
  { rejectValue: string }
>("card/fetchCardByCardId", async (id, { rejectWithValue }) => {
  try {
    const response = await getCardByCardId(id);
    return response.data; // ✅ get the 'data' object from backend response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});



// UPDATE Card
export const updateCardById = createAsyncThunk<
  CreditCardResponse,
  { id: string; cardData: CreditCardRequest },
  { rejectValue: string }
>("card/updateCardById", async ({ id, cardData }, { rejectWithValue }) => {
  try {
    const response = await updateCard(id, cardData);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// DELETE Card
export const deleteCard = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("card/deleteCardById", async (id, { rejectWithValue }) => {
  try {
    await deleteCardById(id);
    return { id };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE CARD
      .addCase(createCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cardData = action.payload;
      })
      .addCase(createCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH ALL CARDS
      .addCase(fetchAllCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        state.loading = false;
        state.allCards = action.payload;
      })
      .addCase(fetchAllCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH CARD BY CARD ID
      .addCase(fetchCardByCardId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardByCardId.fulfilled, (state, action) => {
        state.loading = false;
        state.cardDetails = action.payload;
      })
      .addCase(fetchCardByCardId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE CARD
      .addCase(updateCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.cardData = action.payload; // Update specific card data
      })
      .addCase(updateCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //DELETE CARD

      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.allCards = state.allCards.filter(card => card._id !== action.payload.id);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cardSlice.reducer;
