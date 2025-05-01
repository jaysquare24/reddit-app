import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCommentsDetails = createAsyncThunk(
    "comments/fetchComments",
    async (commentLink, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://www.reddit.com${commentLink}.json`);
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.json();
            return data[1].data.children.map((item) => ({
                commentsDetailsId: item.data.link_id,
                comment: item.data.body,
                postedBy: item.data.author,
                createdAt: new Date(item.data.created_utc * 1000).getTime(), // Convert to milliseconds
                numOfLikes: item.data.ups,
            }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        commentsDetails: {}, // Filtered news details
        loading: false,
        error: false,
       
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsDetails.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchCommentsDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.commentsDetails = action.payload; // Update with the fetched data
                
            })
            .addCase(fetchCommentsDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectCommentsDetails = (state) => state.comments.commentsDetails;
export const selectCommentsLoading = (state) => state.comments.loading;
export const selectCommentsError = (state) => state.comments.error;

export default commentsSlice.reducer;