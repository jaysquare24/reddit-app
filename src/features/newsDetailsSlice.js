import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsDetails } from "./newsDetails";
import { createSelector } from "reselect";



export const fetchNewsRep = createAsyncThunk(
 " news/fetchNews",
 async () => {
  const response = await fetch("https://www.reddit.com/r/technology.json"); // API endpoint
  const data = await response.json(); // Parse the JSON response
  console.log("Fetched News Data:", data); // Log the data to the console
  return data;
})


export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (subreddit = "r/popular" ) => {
   const response = await fetch(`https://www.reddit.com/${subreddit}.json`); // API endpoint
   const data = await response.json(); // Parse 
   //  the JSON response
   return data.data.children.map((item) => ({
      newsId: item.data.name,
      tittle: item.data.title,
      image:  (item.data.thumbnail && item.data.thumbnail !== "self" ? item.data.thumbnail : null), // Ensure null if no valid URL // Use higher-res profile pic if available
      postedBy: item.data.author,
      createdAt: new Date(item.data.created_utc * 1000).getTime(), // Convert to milliseconds
      numOfComments: item.data.num_comments,
      commentLink: item.data.permalink,
      profilePic: item.data.preview?.images[0]?.resolutions?.[0]?.url || 
                  (item.data.thumbnail && item.data.thumbnail !== "self" ? item.data.thumbnail : null), // Ensure null if no valid URL
      numOfLikes: item.data.ups,
      subreddit: item.data.subreddit,
    }));
 })




export const fetchNewsHhold = createAsyncThunk(
  "newsDetails/fetchNewsDetails",
  async () => {
    // Simulate an API call to fetch news details
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newsDetails);
      }, 1000); // Simulate a delay of 1 second
    });
  }
);

export const newsDetailsSlice = createSlice({
    name: "news",
    initialState: {
        newsDetails: {}, // Filtered news details
        allNewsDetails: {}, // Original unfiltered news details
        loading: false,
        error: null,
        searchTerm: ""
    },
    reducers: {
        setSearchTerm: (state, action) => {
            const term = action.payload.trim(); // Update the searchTerm
            state.searchTerm = term;
            if (term) {
                state.newsDetails = Object.fromEntries(
                    Object.entries(state.allNewsDetails).filter(([id, news]) =>
                        news.tittle && news.tittle.toLowerCase().includes(term.toLowerCase())
                    )
                ); // Filter and return as an object
            } else {
                state.newsDetails = state.allNewsDetails; // Reset to allNewsDetails if searchTerm is empty
            }
        },
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchNews.pending, (state) => {
            state.loading = true;
            state.error = null; // Reset error on new fetch
        })
        .addCase(fetchNews.fulfilled, (state, action) => {
            state.loading = false;
            state.allNewsDetails = action.payload || {}; // Ensure allNewsDetails is always an object
            state.newsDetails = action.payload || {}; // Initialize newsDetails with all news
        })
        .addCase(fetchNews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

//Export actions

export const { setSearchTerm} = newsDetailsSlice.actions;


//Export selectors
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
        news.tittle && news.tittle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
);

export default newsDetailsSlice.reducer;
