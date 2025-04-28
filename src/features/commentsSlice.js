import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchCommentsDetails = createAsyncThunk(
    "comments/fetchComments",
    async (commentLink) => {
        
        
        const response = await fetch(`https://www.reddit.com${commentLink}.json`);
        const data = await response.json();

        console.log("Fetched Data:", data); // Log the data to the console 
      
        return data[1].data.children.map((item) => ({
            commentsDetailsId: item.data.link_id,
            comment: item.data.body,
            profilePic: item.data.author_fullname,
            postedBy: item.data.author,
            createdAt: new Date(item.data.created_utc * 1000).getTime(), // Convert to milliseconds
            numOfLikes: item.data.ups,

        }))
    }
)

export const fetchCommentsRep = createAsyncThunk(
    "comments/fetchComments",
    async () => {
        const commentsLink = "/r/news/comments/1k7ml0s/fbi_arrests_wisconsin_judge_for_alleged/";

        const response = await fetch(`https://www.reddit.com${commentsLink}.json`); // Replace with your API endpoint
        const data = await response.json();
        console.log("Fetchedt Data:", data); // Log the data to the console

        const postInfo = data[0]?.data?.children[0]?.data; // Extract post info from the first object
        const comments = data[1]?.data?.children.map((item) => ({
            comment: item.data.body,
            profilePic: item.data.author_fullname,
            postedBy: item.data.author,
            createdAt: new Date(item.data.created_utc * 1000).getTime(), // Convert to milliseconds
            numOfLikes: item.data.ups,
        }));

        return {
            post: {
                id: postInfo?.id,
                title: postInfo?.title,
                author: postInfo?.author,
                createdAt: new Date(postInfo?.created_utc * 1000).getTime(), // Convert to milliseconds
                numOfComments: postInfo?.num_comments,
                numOfLikes: postInfo?.ups,
            },
            comments,
        };
    }
)

export const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        commentsDetails: { }, // Filtered news details
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