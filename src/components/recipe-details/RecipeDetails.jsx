import React, { useEffect, useState } from 'react'
import { Heart, Star } from 'lucide-react';
function RecipeDetails({expandedRecipe,handleCloseExpanded}) {
    const token = localStorage.getItem('token');
  const [favorited, setFavorited] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const handleRatingChange = async (rating) => {
   
        if (!token) {
          alert("You must be logged in to rate!");
          return;
        }
        try {
          const response = await fetch("http://localhost:5001/api/rating/rate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ recipeId: expandedRecipe._id, rating, review: "" }),
          });
      
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Failed to rate recipe");
          }
          console.log("✅ Rating submitted:", data);
          setUserRating(data.rating); // Update UI
        } catch (error) {
          console.error("❌ Error submitting rating:", error.message);
        }
      };


    
      
useEffect(()=>{
  const fetchRecipeDetails = async () =>  {
    try {
      const response = await fetch(`http://localhost:5001/api/recipe/details/${expandedRecipe._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to rate recipe");
      }

      if(userRating==0){
      setUserRating(parseInt(data.averageRating));
        
      }
     
    } catch (error) {
      console.error("❌ Error submitting rating:", error.message);
    }
    
  }
  fetchRecipeDetails();
},[])
      


  const handleFavoriteToggle = () => {
    setFavorited(!favorited);
    // In a real app, this would update the database
    console.log(`Recipe ${expandedRecipe.id} ${!favorited ? 'favorited' : 'unfavorited'}`);
  };

    
  return (
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
            src={'http://localhost:5001/'+expandedRecipe.image}
            alt={expandedRecipe.title} 
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">{expandedRecipe.title}</h2>
          
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
              <p className="font-medium">{expandedRecipe.caloriesPerServing} per serving</p>
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
        <p className="whitespace-pre-line">{expandedRecipe.instructions.join(', ')}</p>
      </div>
    </div>
  </div>
  )
}

export default RecipeDetails