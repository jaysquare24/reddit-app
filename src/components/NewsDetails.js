import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { 
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
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const newsData = useSelector(selectFilteredNewsDetails);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [visibleCommentId, setVisibleCommentId] = useState(null);

  useEffect(() => {
    dispatch(fetchNews()); // Fetch news on component mount
  }, [dispatch]);

  const handleClick = (news) => {
    const id = news.newsId;
    if (visibleCommentId === id) {
      setVisibleCommentId(null); // Hide comments if already visible
    } else {
      setVisibleCommentId(id); // Show selected comment section
      dispatch(fetchCommentsDetails({ subreddit: news.subreddit, postId: news.postId }));

      // Scroll the post into view after DOM updates
      setTimeout(() => {
        const element = document.getElementById(`post-${id}`);
        if (element) element.scrollIntoView({ behavior: "auto", block: "center" });
      }, 100);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching news: {error}</div>;

  if (!loading && !error && newsData.length === 0) {
    return searchTerm ? <Navigate to="/search" replace /> : <p>No Post available</p>;
  }

  return (
    <section className="news-container">
      {newsData.map((news) => (
        <div key={news.newsId} className="news-item">
          <h4>{news.title}</h4>
          {news.image && (
            <img
              className="news-image"
              src={news.image}
              alt={news.title}
              loading="lazy"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <div className="news-bottom">
            <p>
              Posted By: <span className="profile-username">{news.postedBy}</span>
            </p>
            <p>{getRelativeTime(news.createdAt)}</p>
            <p
              className="comments"
              onClick={() => handleClick(news)}
              id={`post-${news.newsId}`}
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
          {visibleCommentId === news.newsId && (
            <div className="comments-section">
              <CommentsDetails newsId={news.newsId} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};