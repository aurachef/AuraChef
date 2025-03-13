
import React, { useState } from 'react';
import HealthBot from './HealthBot';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Convert the search string into an array of ingredients
      const ingredients = searchValue
        .split(',')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient !== '');
      
      onSearch(ingredients);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <HealthBot/>
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
          placeholder="Search recipes by ingredients (e.g., banana, milk)"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ borderRadius: "9999px" }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button 
            type="submit" 
            className=" focus:outline-none focus:shadow-outline"
          >
            <span className="text-white/70 hover:text-white p-2 pr-7">Search</span>
          </button>
        </div>
      </div>
      <p className="text-white/70 text-sm mt-2 text-center">
        Separate ingredients with commas for better results
      </p>
    </form>
  );
};

export default SearchBar;
