import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet } from "../../../utilities/apiCaller";

export const fetchQuizLevels = createAsyncThunk(
  "quizLevel/fetchQuizLevels",
  async ({ token, countryId }, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/country/${countryId}`, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const quizLevelSlice = createSlice({
  name: "quizLevel",
  initialState: {
    levels: [],
    isLoading: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizLevels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizLevels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.levels = action.payload;
      })
      .addCase(fetchQuizLevels.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.data.message;
      });
  },
});

export default quizLevelSlice.reducer;
