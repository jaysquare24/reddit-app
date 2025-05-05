import React,{ useState} from 'react';
import { SearchForm } from './SearchForm';


export const Header = () => {  
    const [isSubRedditVisible, setIsSubRedditVisible] = useState(false);    
    
    const handleMenuClick = () => {
        setIsSubRedditVisible(!isSubRedditVisible);
        const menuButton = document.getElementById("menu-button");
        const menuIcon = document.getElementById("menu-icon");
        const subRedditContainer = document.getElementById("subreddit-container");
        
        subRedditContainer.style.display = isSubRedditVisible ? "none" : "block";

        if (!isSubRedditVisible) {
            menuButton.setAttribute("aria-expanded", "true");
            menuIcon.src = "https://img.icons8.com/?size=100&id=82764&format=png&color=228BE6";
        } else {
            menuButton.setAttribute("aria-expanded", "false");
            menuIcon.src = "https://img.icons8.com/?size=100&id=Rdp3AydLFY2A&format=png&color=000000";
        }
    }

    
    return (

        <header className="header">

            <div className="reddit-logo">    
                <img src="https://img.icons8.com/?size=100&id=lIDbCMF329KK&format=png&color=228BE6" alt=" Reddit Logo" className=" logo" />
                <p className="title">Reddit<span>Minimal</span></p>
            </div>
            <SearchForm />
            
            <nav className=" menu">
              <button className="menu-button" id="menu-button" aria-label="Toggle navigation menu" onClick={handleMenuClick} aria-expanded="false"> 
                <img id="menu-icon" src="https://img.icons8.com/?size=100&id=Rdp3AydLFY2A&format=png&color=000000" alt="Menu icon"/>
              </button>
            </nav>

        </header>

    );
 }

