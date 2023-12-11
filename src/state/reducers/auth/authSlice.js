import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  privateGet,
  privatePutFile,
  publicPost,
} from "../../../utilities/apiCaller";

export const createUserLogin = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await publicPost("/auth/login", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const updateStudentProfile = createAsyncThunk(
  "student/updateStudentProfile",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await privatePutFile(
        "/auth/student/update",
        token,
        data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const getStudentDetails = createAsyncThunk(
  "student/getStudentDetails",
  async (token, { rejectWithValue }) => {
    try {
      const response = await privateGet("/auth/student/details", token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: {},
    error: false,
    errorMessage: "",
    updatedStudent: false,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = {};
      state.error = false;
      state.errorMessage = "";
    },
    errorClean: (state) => {
      state.error = false;
      state.errorMessage = "";
      state.updatedStudent = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserLogin.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(createUserLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.errorMessage = "";
      state.token = action.payload.token;
    });
    builder.addCase(createUserLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload.data.message;
    });
    builder.addCase(updateStudentProfile.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateStudentProfile.fulfilled, (state, action) => {
      const { user: previousUser } = state;
      state.isLoading = false;
      state.error = null;
      state.updatedStudent = true;
      state.user = { token: previousUser.token, ...action.payload };
      state.errorMessage = "";
    });
    builder
      .addCase(updateStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        // state.errorMessage = action.payload.data.message;
      })
      .addCase(getStudentDetails.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getStudentDetails.fulfilled, (state, action) => {
        const { user: previousUser } = state;
        state.isLoading = false;
        state.user = { token: previousUser.token, ...action.payload };
      })
      .addCase(getStudentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload.data.message;
      });
  },
});

export const { login, logout, errorClean } = authSlice.actions;
export default authSlice.reducer;
