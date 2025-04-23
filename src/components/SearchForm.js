import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, selectSearchTerm } from "../features/newsDetailsSlice";

export const SeachForm = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    const handleInputChange = (e) => {
        // Update the local state instead of dispatching directly
        setLocalSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        dispatch(setSearchTerm(localSearchTerm)); // Dispatch the search term on submit
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                value={localSearchTerm}
                onChange={handleInputChange} // Handle input changes
            />
            <button type="submit" className="search-button">
                <img src="https://img.icons8.com/?size=100&id=elSdeHsB03U3&format=png&color=228BE6" alt="Search Icon" className="search-icon" />
            </button>
        </form>
    );
}