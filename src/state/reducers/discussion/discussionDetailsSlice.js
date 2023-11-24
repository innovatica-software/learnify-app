import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicGetSingle } from '../../../utilities/apiCaller';

export const fetchDiscussionDetails = createAsyncThunk(
    'Discussion/fetchDiscussion',
    async (id) => {
        const discussion = await publicGetSingle(`/discussion/get/${id}`);
        return discussion
    }
);
const initialState = {
    discussion: {},
    isLoading: false,
    isError: false,
    error: ''
}
export const discussionSlice = createSlice({
    name: 'Discussion',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscussionDetails.pending, (state) => {
                state.isError = false;
                state.isLoading = true
            })
            .addCase(fetchDiscussionDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.discussion = action.payload;
            })
            .addCase(fetchDiscussionDetails.rejected, (state, action) => {
                state.isLoading = false
                state.discussion = {};
                state.isError = true;
                state.error = action.error?.message;
            })
    }
});

export default discussionSlice.reducer;