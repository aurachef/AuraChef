import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HealthBot from "../components/HealthBot";
import SearchBar from "../components/SearchBar";
import HealthTip from "../components/HealthTip";
import { Heart, Star } from 'lucide-react';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const navigate = useNavigate();

  const mockRecipes = [
    { 
      id: 1, 
      name: 'Banana Smoothie', 
      ingredients: ['banana', 'milk', 'honey', 'ice'], 
      calories: 250, 
      prepTime: '5 min',
      cookTime: '0 min',
      servings: 2,
      instructions: 'Add all ingredients to a blender. Blend until smooth. Pour into glasses and serve immediately.',
      image: 'https://images.unsplash.com/photo-1589734435872-e344bb56e602?q=80&w=1887&auto=format&fit=crop'
    },
    { 
      id: 2, 
      name: 'Banana Pancakes', 
      ingredients: ['banana', 'flour', 'egg', 'milk', 'baking powder'], 
      calories: 350, 
      prepTime: '15 min',
      cookTime: '10 min',
      servings: 4,
      instructions: 'Mash bananas in a bowl. Add remaining ingredients and mix well. Heat a pan over medium heat. Pour 1/4 cup batter for each pancake. Cook until bubbles form, then flip and cook other side. Serve warm with maple syrup.',
      image: 'https://images.unsplash.com/photo-1575853121743-60c24f0a7502?q=80&w=1964&auto=format&fit=crop'
    },
    { 
      id: 3, 
      name: 'Fruit Salad', 
      ingredients: ['banana', 'apple', 'orange', 'grapes', 'yogurt'], 
      calories: 180, 
      prepTime: '10 min',
      cookTime: '0 min',
      servings: 3,
      instructions: 'Wash all fruit. Peel and chop banana, apple, and orange. Mix all fruit in a bowl. Top with yogurt. Serve chilled.',
      image: 'https://images.unsplash.com/photo-1568948980600-950f7863c114?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      id: 4, 
      name: 'Cereal with Milk', 
      ingredients: ['milk', 'cereal', 'honey'], 
      calories: 220, 
      prepTime: '2 min',
      cookTime: '0 min',
      servings: 1,
      instructions: 'Pour cereal into a bowl. Add milk. Drizzle with honey. Enjoy!',
      image: 'https://images.unsplash.com/photo-1521483451396-8a3e8697332d?q=80&w=1925&auto=format&fit=crop'
    },
    { 
      id: 5, 
      name: 'Oatmeal', 
      ingredients: ['oats', 'milk', 'banana', 'cinnamon', 'walnuts'], 
      calories: 300, 
      prepTime: '5 min',
      cookTime: '5 min',
      servings: 1,
      instructions: 'In a pot, combine oats and milk. Bring to a simmer over medium heat. Cook for 5 minutes, stirring occasionally. Remove from heat, transfer to a bowl. Top with sliced banana, sprinkle with cinnamon and walnuts.',
      image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1887&auto=format&fit=crop'
    },
  ];

  const handleSearch = (searchIngredients) => {
    console.log('Searching for ingredients:', searchIngredients);
    
    const results = mockRecipes.map(recipe => {
      const matchCount = searchIngredients.filter(ing => 
        recipe.ingredients.some(recipeIng => recipeIng.includes(ing.toLowerCase()))
      ).length;
      
      return { recipe, matchCount, matchPercentage: matchCount / searchIngredients.length * 100 };
    }).filter(item => item.matchCount > 0);
    
    results.sort((a, b) => b.matchCount - a.matchCount);
    
    setSearchResults(results.map(item => ({
      ...item.recipe,
      matchCount: item.matchCount,
      matchPercentage: item.matchPercentage
    })));
    
    setHasSearched(true);
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleRecipeClick = (recipe) => {
    setExpandedRecipe(recipe);
    setUserRating(0);
    setFavorited(false);
  };

  const handleCloseExpanded = () => {
    setExpandedRecipe(null);
  };

  const handleFavoriteToggle = () => {
    setFavorited(!favorited);
    // In a real app, this would update the database
    console.log(`Recipe ${expandedRecipe.id} ${!favorited ? 'favorited' : 'unfavorited'}`);
  };

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    // In a real app, this would update the database
    console.log(`Recipe ${expandedRecipe.id} rated ${rating} stars`);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-transition flex flex-col items-center max-w-5xl mx-auto">
        
        <HealthTip />

        <div className="w-full max-w-4xl mb-6 mt-6">
          
          <SearchBar onSearch={handleSearch} />
        </div>

        {hasSearched && (
          <div className="w-full max-w-4xl my-8">
            <h3 className="text-xl font-semibold mb-4">
              {searchResults.length > 0 ? `Found ${searchResults.length} recipes` : 'No recipes found'} 
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(recipe => (
                <div 
                  key={recipe.id} 
                  className="card card-3d cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <h4 className="text-lg font-semibold mb-2">{recipe.name}</h4>
                  <p className="text-sm text-white/80 mb-2">
                    <span className="font-medium">{recipe.calories}</span> calories | 
                    <span className="font-medium ml-1">{recipe.prepTime}</span>
                  </p>
                  <div className="mb-3">
                    <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                      {Math.round(recipe.matchPercentage)}% match
                    </span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Ingredients: </span> 
                    {recipe.ingredients.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <div className="card card-3d">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Recipes</h3>
                <p className="text-white/80">
                  Discover delicious and nutritious recipes tailored to your
                  dietary preferences.
                </p>
              </div>
            </div>

            <div className="card card-3d">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Calorie Tracking</h3>
                <p className="text-white/80">
                  Track your daily calorie intake and get insights to maintain a
                  balanced diet.
                </p>
              </div>
            </div>

            <div className="card card-3d">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Tips</h3>
                <p className="text-white/80">
                  Get instant health and nutrition tips to improve your daily
                  habits.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16">
          <button className="btn btn-primary btn-3d" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
      {/* Expanded Recipe Modal */}
      {expandedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={handleCloseExpanded}></div>
          <div className="glass p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10">
            <button 
              className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
              onClick={handleCloseExpanded}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img 
                  src={expandedRecipe.image} 
                  alt={expandedRecipe.name} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-2">{expandedRecipe.name}</h2>
                
                <div className="flex items-center space-x-4 mb-4">
                  <button 
                    className={`p-2 rounded-full ${favorited ? 'bg-white/20' : 'bg-white/10'} transition-colors`}
                    onClick={handleFavoriteToggle}
                  >
                    <Heart className={`h-5 w-5 ${favorited ? 'fill-white text-white' : 'text-white'}`} />
                  </button>
                  
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        onClick={() => handleRatingChange(star)}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`h-5 w-5 ${star <= userRating ? 'fill-white text-white' : 'text-white/50'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-white/70">Prep Time</p>
                    <p className="font-medium">{expandedRecipe.prepTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Cook Time</p>
                    <p className="font-medium">{expandedRecipe.cookTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Servings</p>
                    <p className="font-medium">{expandedRecipe.servings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Calories</p>
                    <p className="font-medium">{expandedRecipe.calories} per serving</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                {expandedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-semibold mb-2">Instructions</h3>
              <p className="whitespace-pre-line">{expandedRecipe.instructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
