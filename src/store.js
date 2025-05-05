import { configureStore } from "@reduxjs/toolkit";
import  newsDetailsReducer from "./features/newsDetailsSlice";
import commentsDetailsReducer from "./features/commentsSlice"; 


export const store = configureStore({
    reducer: {
        news: newsDetailsReducer,
        comments: commentsDetailsReducer, 
    }
});