import React, { useState, useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { 
    selectNewsDetails, 
    selectLoading, 
    selectError, 
    selectSearchTerm, 
    selectFilteredNewsDetails, 
    fetchNews 
} from "../features/newsDetailsSlice"; 
import { fetchCommentsDetails } from "../features/commentsSlice";
import { getRelativeTime, formatNumber } from "../utilities";
import { CommentsDetails } from "./CommentsDetails";


export const NewsDetails = () => {
    const newsDetails = useSelector(selectNewsDetails);
    const searchTerm = useSelector(selectSearchTerm);
    const newsData = useSelector(selectFilteredNewsDetails);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch();
    const [visibleCommentId, setVisibleCommentId] = useState(null);

    useEffect(() => {
        dispatch(fetchNews()); // Fetch news on component mount
    }, [dispatch]);

    const handleClick = (id, commentLink) => {
        if (visibleCommentId === id) {
            setVisibleCommentId(null); // Hide comments if already visible
        } else {
            setVisibleCommentId(id); // Show selected comment section
            dispatch(fetchCommentsDetails(commentLink));
        }
    };

    return (
                   
        <section className="news-container"> 
            {loading && <div>Loading...</div>}
            {error && <div>Error fetching news: {error}</div>}
            {!loading && !error && newsDetails ? (
            Object.keys(newsData).length > 0 ? (
            Object.entries(newsData).map(([id, news]) => (
            <div key={id} className="news-item">
                <h4>{news.title}</h4>
                <img className="news-image" src={news.image} alt={news.title} 
                  onError={(e) => (e.target.style.display = 'none')}
                />
                <div className="news-bottom">
                    <p>Posted By: <span className="profile-username">{news.postedBy}</span></p>
                    <p>{getRelativeTime(news.createdAt)}</p>
                    <p
                        className="comments"
                        onClick={() => handleClick(id, news.commentLink)}
                    >
                        <img 
                            src="https://img.icons8.com/?size=100&id=47732&format=png&color=FFFFFF" 
                            alt="Comments Icon" 
                        />
                        {formatNumber(news.numOfComments)}
                    </p>
                    <p>
                        <img 
                            src="https://img.icons8.com/?size=100&id=66627&format=png&color=FFFFFF" 
                            alt="Likes icon" 
                        />
                        {formatNumber(news.numOfLikes)}
                    </p>
                </div>
                {visibleCommentId === id && (
                    <div className="comments-section">
                        <CommentsDetails newsId={news.newsId} />
                    </div>
                )}
            </div>
            ))) : (
            searchTerm && 
            <Navigate to="/search" replace /> // Redirect to search page if no news found
            )) : (
            !loading && !error && <p>No Post available</p>
            )}
        </section>
        
    );
};