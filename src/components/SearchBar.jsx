import React, { useEffect, useState } from 'react';
import HealthBot from './HealthBot';



const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  // Function to get a matching ingredient suggestion
  const getSuggestion = (input) => {
    const ingredients = input.split(',').map(i => i.trim()); // Split ingredients
    const lastIngredient = ingredients[ingredients.length - 1]; // Get last one
    if (!lastIngredient) return ''; // No suggestion if empty

    return ingredientsList.find((item) =>
      item.toLowerCase().startsWith(lastIngredient.toLowerCase())
    ) || '';
  };

  // Handle Input Change
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSuggestion(getSuggestion(value));
  };

  // Auto-complete when pressing "Tab", "Arrow Right" or ","
  const handleKeyDown = (e) => {
    if ((e.key === "Tab" || e.key === "ArrowRight") && suggestion) {
      e.preventDefault(); // Prevent default tab behavior
      const ingredients = searchValue.split(',').map(i => i.trim());
      ingredients[ingredients.length - 1] = suggestion; // Replace last typed part
      setSearchValue(ingredients.join(', ') + ', '); // Add comma for next input
      setSuggestion(''); // Clear suggestion
    }

    if (e.key === "," && suggestion) {
      e.preventDefault();
      setSearchValue(prev => prev.replace(/[^,]*$/, suggestion + ', ')); // Replace only last word
      setSuggestion(''); // Reset suggestion
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  useEffect(()=>{
    const fetchAvailableIncrediant = async ()=>{
      try {
        const response = await fetch("http://localhost:5001/api/recipe/incredients", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch Incrediants");
        }
    
        const data = await response.json();
        setIngredientsList(data)
        setSearchResults(data)
        
      } catch (error) {
        console.error("❌Error Suggestion ", error);
      }

    }


     fetchAvailableIncrediant()
  })

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <HealthBot />
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
        
        {/* Search Input */}
        <input
          type="search"
          className="w-full glass py-4 pl-12 pr-4 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
          placeholder="Search recipes by ingredients (e.g., banana, milk)"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{ borderRadius: "9999px" }}
        />

        {/* Auto-suggested text (in place of user input) */}
        {suggestion && (
          <span className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
            {searchValue.replace(/[^,]*$/, " "+suggestion)}
          </span>
        )}

        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button 
            type="submit" 
            className="focus:outline-none focus:shadow-outline"
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
