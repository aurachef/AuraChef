
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg 
            className="w-5 h-5 text-white/70" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="search"
          className="w-full glass py-4 pl-12 pr-4 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
          placeholder="Search for food tips, recipes, calorie info..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ borderRadius: "9999px" }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
