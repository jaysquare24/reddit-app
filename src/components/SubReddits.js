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
    const subRedditContainer = document.getElementById("subreddit-container");
    const menuIcon = document.getElementById("menu-icon");

    // Apply style change only for mobile devices (screen width <= 768px)
    if (window.innerWidth <= 450) {
        subRedditContainer.style.display = "none"; // Hide the subreddit container on click
    }

    menuIcon.src = "https://img.icons8.com/?size=100&id=Rdp3AydLFY2A&format=png&color=000000";

    setActiveSubReddit(subReddit);
    dispatch(fetchNews(subReddit));
    dispatch(clearSearchTerm());
    navigate("/"); // Navigate to the home page after fetching news
  };


  return (
    <section className="subreddit-container" id="hidden">
      <h2>Subreddits</h2>
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

