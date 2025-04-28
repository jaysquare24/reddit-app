import React from "react";
import { useDispatch } from "react-redux";
import { fetchNews } from "../features/newsDetailsSlice";

export const SubReddits = () => {

  const dispatch = useDispatch(); // Initialize the dispatch function
  
  React.useEffect(() => {
    // Fetch news for the default subreddit when the component mounts
    dispatch(fetchNews()); // No argument needed, default is "r/technology"
}, [dispatch]);

    const handleClick = (subreddit) => {
        // Dispatch the action to fetch news based on the subreddit
        dispatch(fetchNews(subreddit));
    }
    return (
        
        <>
            <h2>Subreddit</h2>
            <div className="subreddit-list">
                <p className="subreddit-item" onClick={() => handleClick("r/technology")}>r/technology</p>
                <p className="subreddit-item">r/science</p>
                <p className="subreddit-item">r/worldnews</p>
                <p className="subreddit-item" onClick={() => handleClick("r/politics")}>r/politics</p>
                <p className="subreddit-item">r/business</p>
                <p className="subreddit-item">r/education</p>
                <p className="subreddit-item">r/environment</p>
                <p className="subreddit-item">r/finance</p>
                <p className="subreddit-item">r/AskReddit</p>
                <p className="subreddit-item">r/space</p>
                <p className="subreddit-item">r/health</p>
                <p className="subreddit-item">r/food</p>
                <p className="subreddit-item">r/sports</p>
                <p className="subreddit-item">r/music</p>
                <p className="subreddit-item">r/movies</p>
                <p className="subreddit-item">r/books</p>
                <p className="subreddit-item">r/gaming</p>
                <p className="subreddit-item">r/art</p>
                <p className="subreddit-item">r/history</p>
                <p className="subreddit-item">r/photography</p>
                <p className="subreddit-item">r/travel</p>
                <p className="subreddit-item">r/woahthatsinteresting</p>
                
            </div>
            
        </>
           
        
    );
}

