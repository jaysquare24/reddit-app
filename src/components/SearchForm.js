
export const SeachForm = ({ searchTerm, setSearchTerm }) => {
    return (
        <form className="search-form">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
                <img src="https://img.icons8.com/?size=100&id=elSdeHsB03U3&format=png&color=228BE6" alt="Search Icon" className="search-icon" />
            </button>
            
        </form>
        
    );
}