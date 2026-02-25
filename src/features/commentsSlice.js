import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk
export const fetchCommentsDetails = createAsyncThunk(
  "comments/fetchComments",
  async ({ subreddit, postId }, { rejectWithValue }) => {
    try {
      
      const response = await fetch(`http://localhost:5000/api/comments/${subreddit}/${postId}`,  
        {
            headers: {
            "User-Agent": "reddit-client-app"
            }
        });
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();

      return data[1].data.children.map((item) => ({
        commentsDetailsId: item.data.link_id,
        comment: item.data.body,
        postedBy: item.data.author,
        createdAt: item.data.created_utc * 1000,
        numOfLikes: item.data.ups,
      }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Slice
export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    commentsDetails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsDetails = action.payload;
      })
      .addCase(fetchCommentsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch comments";
      });
  },
});

// Selectors
export const selectCommentsDetails = (state) => state.comments.commentsDetails;
export const selectCommentsLoading = (state) => state.comments.loading;
export const selectCommentsError = (state) => state.comments.error;

export default commentsSlice.reducer;