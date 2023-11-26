import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet, privatePost } from "../../../utilities/apiCaller";

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

export const subscribeQuizLevel = createAsyncThunk(
  "quizLevel/subscribeQuizLevel",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await privatePost("/quiz-levels/subscribe", token, data);
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
    isSubscribe: false,
  },
  reducers: {
    setIsSubscribed(state) {
      state.isSubscribe = false;
    },
  },
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
      })
      .addCase(subscribeQuizLevel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(subscribeQuizLevel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSubscribe = true;
      })
      .addCase(subscribeQuizLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.data.message;
      });
  },
});
export const { setIsSubscribed } = quizLevelSlice.actions;
export default quizLevelSlice.reducer;
