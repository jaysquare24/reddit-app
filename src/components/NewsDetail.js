import { selectNewsDetails, selectLoading, selectError, selectSearchTerm, selectFilteredNewsDetails } from "../features/newsDetailsSlice";
import { useSelector } from "react-redux";
import {getRelativeTime} from "../utilities";
import { useState } from "react"; // Import useState

export const NewsDetail = () => {
    const newsDetails = useSelector(selectNewsDetails);
    const searchTerm = useSelector(selectSearchTerm); // Get the search term from the Redux store   
    const newsData = useSelector(selectFilteredNewsDetails); // Get the filtered news details from the Redux store
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [visibleComments, setVisibleComments] = useState({}); // State to track visible comments

    const toggleComments = (index) => {
        setVisibleComments((prev) => ({
            [index]: !prev[index], // Toggle visibility for the specific news item
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div className="news-details">
            {newsDetails ? (
                newsData.length > 0 ? (
                    newsData.map((news, index) => (
                        <div key={index} className="news-item">
                            <h2>{news.tittle}</h2>
                            <img className="news-image"src={news.image} alt={news.tittle} />
                            <div className="news-bottom">
                                <p>Posted by: {news.postedBy}</p>
                                <p>Created at: {getRelativeTime(news.createdAt)}</p>
                                <p
                                    className="comments"
                                    onClick={() => toggleComments(index)} // Add onClick handler
                                >
                                    Comments: {news.comments.length}
                                </p>
                                <p>Likes: {news.numOfLikes}</p>

                            </div>
                            {visibleComments[index] && ( // Conditionally render comments
                                    <ul className="comments-list">
                                        {news.comments.map((comment, index) => (
                                            <li className="comment" key={index}>
                                                <div className="comment-header">
                                                    <div className="user-info">
                                                        <img 
                                                            className="profile-imge"
                                                            src={comment.profilePic} 
                                                            alt={`${comment.postedBy}'s profile`} 
                                                            style={{ width: "15px", height:"20px", marginRight: "10px"}} 
                                                        />
                                                        <p>{comment.postedBy}</p>
                                                    
                                                    </div>
                                                    <p>{getRelativeTime(comment.createdAt)}</p>
                                                </div>
                                                
                                                <p>{comment.comment}</p>
                                                    
                                            </li>
                                        ))}
                                    </ul>
                                )}
                        </div>
                    ))
                ) : (
                    searchTerm && (
                        <p>No Post available for "{searchTerm}"</p>
                    ) 
                )
            ) : (
                <p>No Post available</p>
            )}
        </div>
    );
};