import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicGet } from '../../../utilities/apiCaller';

export const fetchDiscussion = createAsyncThunk('discussion/fetchDiscussion', async (_, { rejectWithValue }) => {
    try {
        const response = await publicGet('/discussion/get');
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response);
    }
});

export const discussionsSlice = createSlice({
    name: 'Discussion',
    initialState: {
        discussion: [],
        isLoading: false,
        error: false,
        success: false,
        errorMessage: ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscussion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDiscussion.fulfilled, (state, action) => {
                state.discussion = action.payload;
                state.isLoading = false;
                state.errorMessage = "";
                state.success = true;
            })
            .addCase(fetchDiscussion.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
                state.errorMessage = action.payload.data.message;
                state.discussion = [];
            });
    },
});

export default discussionsSlice.reducer;