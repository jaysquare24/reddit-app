import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, selectSearchTerm } from "../features/newsDetailsSlice";

export const SearchForm = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    useEffect(() => {
        setLocalSearchTerm(searchTerm); // Update local state when Redux state changes
    }, [searchTerm]);

    const handleInputChange = (e) => {
        setLocalSearchTerm(e.target.value); // Update local state
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        dispatch(setSearchTerm(localSearchTerm)); // Dispatch the search term
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                value={localSearchTerm}
                onChange={handleInputChange}
            />
            <button type="submit" className="search-button">
                <img 
                    src="https://img.icons8.com/?size=100&id=elSdeHsB03U3&format=png&color=228BE6" 
                    alt="Search Icon" 
                    className="search-icon" 
                />
            </button>
        </form>
    );
};