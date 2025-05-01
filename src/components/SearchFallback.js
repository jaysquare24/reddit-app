import React from "react";
import { useNavigate} from "react-router-dom";
import { selectSearchTerm, clearSearchTerm} from "../features/newsDetailsSlice";
import { useSelector, useDispatch } from "react-redux";


export function SearchFallback() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm) || ""; 
    

    const handleGoBack = () => {
        dispatch(clearSearchTerm()); // Clear the search term in Redux store
        navigate("/"); // Navigate back to the home page

    };


    return(
        <section className="search-fallback">
            <p>No Post available for "{searchTerm}"</p> 
            <button className="home-button" onClick={handleGoBack}>Go Back</button>
        </section>

    );
}
