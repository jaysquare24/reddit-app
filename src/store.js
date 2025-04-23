import { configureStore } from "@reduxjs/toolkit";
import  newsDetailsReducer from "./features/newsDetailsSlice";


export const store = configureStore({
    reducer: {
        news: newsDetailsReducer,
        // Add your reducers here
    }
});