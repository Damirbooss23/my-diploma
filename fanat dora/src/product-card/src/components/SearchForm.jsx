import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(searchValue);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    );
};

export default SearchForm;