import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privatePost, publicGetSingle } from "../../../utilities/apiCaller";

export const fetchDiscussionDetails = createAsyncThunk(
  "Discussion/fetchDiscussion",
  async (id) => {
    const discussion = await publicGetSingle(`/discussion/get/${id}`);
    return discussion;
  }
);
export const postComment = createAsyncThunk(
  "comments/postComment",
  async ({ token, discussionId, comment }) => {
    const response = await privatePost("/discussion/comment", token, {
      comment,
      discussionId,
    });
    return response.data;
  }
);
const initialState = {
  discussion: {},
  isLoading: false,
  isError: false,
  isCommentPost: false,
  error: "",
};
export const discussionSlice = createSlice({
  name: "Discussion",
  initialState,
  reducers: {
    setCommentPostState: (state, action) => {
      state.isCommentPost = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscussionDetails.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchDiscussionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discussion = action.payload;
      })
      .addCase(fetchDiscussionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.discussion = {};
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(postComment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(postComment.fulfilled, (state) => {
        state.isLoading = false;
        state.isCommentPost = true;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});
export const { setCommentPostState } = discussionSlice.actions;
export default discussionSlice.reducer;
