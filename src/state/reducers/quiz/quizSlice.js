import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  privateGet,
  privatePost,
  publicGet,
} from "../../../utilities/apiCaller";

export const fetchQuizData = createAsyncThunk(
  "quiz/fetchQuizData",
  async ({ token, levelId }, { rejectWithValue }) => {
    try {
      const response = await privateGet(`/quiz-levels/${levelId}`, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const fetchFreeQuizData = createAsyncThunk(
  "quiz/fetchFreeQuizData",
  async ({ levelId }, { rejectWithValue }) => {
    try {
      const response = await publicGet(`/quiz-levels/free/${levelId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const submitQuizAnswers = createAsyncThunk(
  "attemptQuiz/submitQuizAnswers",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await privatePost("/quiz-levels/attempt", token, data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quiz: {},
    questions: [],
    isLoading: false,
    errorMessage: null,
    isSubmitQuiz: false,
  },
  reducers: {
    setSubmitQuizState: (state) => {
      state.isSubmitQuiz = false;
    },
    cleanQuizState: (state) => {
      state.quiz = {};
      state.questions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizData.pending, (state) => {
        state.isLoading = true;
        state.quiz = {};
        state.questions = [];
        state.errorMessage = null;
      })
      .addCase(fetchQuizData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quiz = action.payload;
        state.questions = action.payload.questions;
      })
      .addCase(fetchQuizData.rejected, (state, action) => {
        state.isLoading = false;
        state.quiz = {};
        state.questions = [];
        state.errorMessage = action.payload.data.message;
      })
      .addCase(fetchFreeQuizData.pending, (state) => {
        state.isLoading = true;
        state.quiz = {};
        state.questions = [];
        state.errorMessage = null;
      })
      .addCase(fetchFreeQuizData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quiz = action.payload;
        state.questions = action.payload.questions;
      })
      .addCase(fetchFreeQuizData.rejected, (state, action) => {
        state.isLoading = false;
        state.quiz = {};
        state.questions = [];
        state.errorMessage = action.payload.data.message;
      })
      .addCase(submitQuizAnswers.pending, (state) => {
        state.isLoading = true;
        state.quiz = {};
        state.questions = [];
        state.errorMessage = null;
      })
      .addCase(submitQuizAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quiz = {};
        state.questions = [];
        state.isSubmitQuiz = true;
      })
      .addCase(submitQuizAnswers.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.data.message;
      });
  },
});
export const { setSubmitQuizState, cleanQuizState } = quizSlice.actions;
export default quizSlice.reducer;
