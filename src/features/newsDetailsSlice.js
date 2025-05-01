import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (subReddit = "r/popular", { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.reddit.com/${subReddit}.json`);
      if (!response.ok) {
        throw new Error( response.status);
      }
      const data = await response.json();
      return data.data.children.map((item) => ({
        newsId: item.data.name,
        title: item.data.title,
        image: item.data.url || null, // Simplified null check
        postedBy: item.data.author,
        createdAt: new Date(item.data.created_utc * 1000).getTime(),
        numOfComments: item.data.num_comments,
        commentLink: item.data.permalink,
        numOfLikes: item.data.ups,
      }));
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);

export const newsDetailsSlice = createSlice({
  name: "news",
  initialState: {
    newsDetails: {},
    allNewsDetails: {},
    loading: false,
    error: null,
    searchTerm: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload.trim();
      
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.allNewsDetails = action.payload || {}; // Ensure default value
        state.newsDetails = action.payload || {}; // Ensure default value
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred"; // Ensure error message is displayed
        
      });
  },
});

// Export actions
export const { setSearchTerm, clearSearchTerm} = newsDetailsSlice.actions;

// Export selectors
export const selectSearchTerm = (state) => state.news.searchTerm;
export const selectNewsDetails = (state) => state.news.newsDetails;
export const selectLoading = (state) => state.news.loading;
export const selectError = (state) => state.news.error;

// Memoized selector for filtered news details
export const selectFilteredNewsDetails = createSelector(
  [selectNewsDetails, selectSearchTerm],
  (newsDetails, searchTerm) => {
    return Object.fromEntries(
      Object.entries(newsDetails || {}).filter(([id, news]) =>
        news.title && news.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
);

export default newsDetailsSlice.reducer;
