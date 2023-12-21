import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privatePost } from '../../../utilities/apiCaller';

export const submitCountryLevel = createAsyncThunk(
  'countryLevel/submitCountryLevel',
  async ({data, token}, { rejectWithValue }) => {
    try {
      const response = await privatePost('/quiz-levels/create', token, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const countryLevelSlice = createSlice({
  name: 'countryLevel',
  initialState: {
    isLoading: false,
    error: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    submitQuizClean: (state) => {
        state.error = false;
        state.errorMessage = "";
        state.success = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCountryLevel.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(submitCountryLevel.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.errorMessage = "";
      })
      .addCase(submitCountryLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.errorMessage = action.payload.data.message;
      });
  },
});

export default countryLevelSlice.reducer;
export const { submitQuizClean } = countryLevelSlice.actions;