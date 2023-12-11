import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateGet } from '../../../utilities/apiCaller';

export const getStudentTransactions = createAsyncThunk(
    "student/getStudentTransactions",
    async (token, { rejectWithValue }) => {
      try {
        const response = await privateGet("/account/transactions", token);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response);
      }
    }
  );

export const transactionsSlice = createSlice({
    name: 'Transactions',
    initialState: {
        transactions: [],
        isLoading: false,
        error: false,
        success: false,
        errorMessage: ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudentTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStudentTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.isLoading = false;
                state.errorMessage = "";
                state.success = true;
            })
            .addCase(getStudentTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.errorMessage = action.payload.data.message;
                state.transactions = [];
            });
    },
});

export default transactionsSlice.reducer;