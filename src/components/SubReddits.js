import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchNews } from "../features/newsDetailsSlice";
import { subReddits } from "../features/subRedditsData";
import  { useNavigate } from "react-router-dom";
import { clearSearchTerm } from "../features/newsDetailsSlice";

export const SubReddits = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [activeSubReddit, setActiveSubReddit] = useState("r/popular");

  const handleClick = (subReddit) => {
    setActiveSubReddit(subReddit);
    dispatch(fetchNews(subReddit));
    dispatch(clearSearchTerm());
    navigate("/"); // Navigate to the home page after fetching news
  };


  return (
    <section className="subreddit-container">
      <h2>Subreddit</h2>
      <div className="subreddit-list">
        {subReddits.map((subReddit) => (
          <p
            key={subReddit.name}
            className={`subreddit-item ${activeSubReddit === subReddit.name ? "active" : ""}`}
            onClick={() => handleClick(subReddit.name)}
          >
            {subReddit.label}
          </p>
        ))}
      </div>
    </section>
  );
};

