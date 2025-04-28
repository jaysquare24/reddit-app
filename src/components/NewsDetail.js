import React from "react";
import { selectNewsDetails, selectLoading, selectError, selectSearchTerm, selectFilteredNewsDetails } from "../features/newsDetailsSlice";
import { useSelector, useDispatch } from "react-redux";
import { getRelativeTime } from "../utilities";
import { useState, useEffect } from "react"; // Import useState
import { CommentsDetails } from "./CommentsDetails";
import { fetchCommentsDetails } from "../features/commentsSlice";
import { fetchNews } from "../features/newsDetailsSlice"; // Import the fetchNews action
import { SubReddits } from "./SubReddits";  

export const NewsDetail = () => {
    const newsDetails = useSelector(selectNewsDetails);
    const searchTerm = useSelector(selectSearchTerm); // Get the search term from the Redux store   
    const newsData = useSelector(selectFilteredNewsDetails); // Get the filtered news details from the Redux store
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch(); // Initialize the dispatch function
    const [visibleCommentId, setVisibleCommentId] = useState(null); // State to track the currently visible comment section
   
    

    const handleClick = (id, commentLink) => {
        if (visibleCommentId === id) {
            setVisibleCommentId(null); // Hide the comment section if it's already visible
        } else {
            setVisibleCommentId(id); // Show the selected comment section
            dispatch(fetchCommentsDetails(commentLink)); // Fetch comments for the selected news item
        }
    };

    return (
        <div className="news-detail-container">
            <div className="subreddit-container">
                <SubReddits /> {/* Include the SubReddits component */}
            </div>
            <div className="news-details">
                {loading && <div>Loading...</div>} {/* Show loading state */}
                {error && <div>Error: {error}</div>} {/* Move error check here */}
                {!loading && !error && newsDetails ? (
                    Object.keys(newsData).length > 0 ? (
                        Object.entries(newsData).map(([id, news]) => (
                            <div key={id} className="news-item">
                                <h2>{news.tittle}</h2>
                                <img className="news-image" src={news.image} alt={news.tittle} />
                                <div className="news-bottom">
                                    <p>Posted by: {news.postedBy}</p>
                                    <p>Created at: {getRelativeTime(news.createdAt)}</p>
                                    <p
                                        className="comments"
                                        onClick={() => handleClick(id, news.commentLink)} // Add onClick handler
                                    >
                                        Comments: {news.numOfComments}
                                    </p>
                                    <p>Likes: {news.numOfLikes}</p>
                                </div>
                                {visibleCommentId === id && ( // Conditionally render comments for the currently visible section
                                    <div className="comments-section">
                                        <CommentsDetails newsId={news.newsId} /> {/* Pass the news ID to CommentsDetails */}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        searchTerm && <p>No Post available for "{searchTerm}"</p>
                    )
                ) : (
                    !loading && !error && <p>No Post available</p> // Ensure this only renders when not loading or error
                )}
            </div>
        </div>
    );
};