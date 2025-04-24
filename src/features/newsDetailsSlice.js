import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsDetails } from "./newsDetails";

export const fetchNewsDetails = createAsyncThunk(
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
        newsDetails: [], // Filtered news details
        allNewsDetails: [], // Original unfiltered news details
        loading: false,
        error: null,
        searchTerm: ""
    },
    reducers: {
        setSearchTerm: (state, action) => {
            const term = action.payload.trim(); // Update the searchTerm
            state.searchTerm = term;
            if (term) {
                state.newsDetails = state.allNewsDetails.filter((news) =>
                    news.tittle && news.tittle.toLowerCase().includes(term.toLowerCase()) // Filter from allNewsDetails
                );
            } else {
                state.newsDetails = state.allNewsDetails; // Reset to allNewsDetails if searchTerm is empty
            }
        },
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchNewsDetails.pending, (state) => {
            state.loading = true;
            state.error = null; // Reset error on new fetch
        })
        .addCase(fetchNewsDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.allNewsDetails = action.payload || []; // Ensure allNewsDetails is always an array
            state.newsDetails = action.payload || []; // Initialize newsDetails with all news
        })
        .addCase(fetchNewsDetails.rejected, (state, action) => {
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
export const selectFilteredNewsDetails = (state) => {  
  const newsDetails = state.news.newsDetails;
  const searchTerm = state.news.searchTerm; // Get the search term from the Redux store
    
  return newsDetails.filter((news) =>
    news.tittle && news.tittle.toLowerCase().includes(searchTerm.toLowerCase())
  );   
    
}
export default newsDetailsSlice.reducer;
