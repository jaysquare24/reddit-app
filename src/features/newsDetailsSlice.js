import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const baseUrl = process.env.REACT_APP_API_URL || "";

// Async thunk to fetch news from backend proxy
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (subReddit = "pics", { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/api/${subReddit}`,
      {
        headers: {
          "User-Agent": "reddit-client-app"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();

  
    return data.data.children.map((item) => {
    const post = item.data;

    const image =
      post.preview?.images?.[0]?.resolutions?.[2]?.url?.replace(/&amp;/g, "&") ||
      (post.thumbnail && post.thumbnail.startsWith("http") ? post.thumbnail : null) ||
      (post.url && post.url.match(/\.(jpg|jpeg|png|webp)$/i) ? post.url : null);

    return {
      newsId: post.name,
      subreddit: subReddit,
      postId: post.id,
      commentLink: post.permalink,
      title: post.title,
      image,
      postedBy: post.author,
      createdAt: post.created_utc * 1000,
      numOfComments: post.num_comments,
      numOfLikes: post.ups,
    };
  });
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const newsDetailsSlice = createSlice({
  name: "news",
  initialState: {
    newsDetails: [],      // Array for filtered news
    allNewsDetails: [],   // Array for all fetched news
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
        state.allNewsDetails = action.payload || [];
        state.newsDetails = action.payload || [];
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred";
      });
  },
});

// Export actions
export const { setSearchTerm, clearSearchTerm } = newsDetailsSlice.actions;

// Selectors
export const selectSearchTerm = (state) => state.news.searchTerm;
export const selectNewsDetails = (state) => state.news.newsDetails;
export const selectLoading = (state) => state.news.loading;
export const selectError = (state) => state.news.error;

// Memoized selector for filtered news (array-based)
export const selectFilteredNewsDetails = createSelector(
  [selectNewsDetails, selectSearchTerm],
  (newsDetails, searchTerm) => {
    const term = (searchTerm || "").trim().toLowerCase();
    return (newsDetails || []).filter(
      (news) => news.title?.toLowerCase().includes(term)
    );
  }
);

export default newsDetailsSlice.reducer;