import { configureStore } from "@reduxjs/toolkit";
import  newsDetailsReducer from "./features/newsDetailsSlice";
import commentsDetailsReducer from "./features/commentsSlice"; // Import your comments slice


export const store = configureStore({
    reducer: {
        news: newsDetailsReducer,
        comments: commentsDetailsReducer, // Add your comments slice here
        // Add your reducers here
    }
});