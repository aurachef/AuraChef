
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit2, Heart, Trash2 } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  
  // Mock user data
  const user = {
    username: 'JohnDoe123',
    email: 'john.doe@example.com',
    bio: 'Food enthusiast and home chef. I love exploring new recipes and flavors!',
    profileImage: null
  };
  
  // Mock user recipes (contributed)
  const contributedRecipes = [
    { 
      id: 1, 
      name: 'Homemade Pizza', 
      ingredients: ['flour', 'yeast', 'olive oil', 'salt', 'tomato sauce', 'cheese', 'toppings'], 
      calories: 320, 
      prepTime: '30 min',
      cookTime: '15 min',
      servings: 4,
      instructions: '1. Mix flour, yeast, oil, and salt to make dough.\n2. Let rise for 1 hour.\n3. Roll out and add sauce, cheese, and toppings.\n4. Bake at 450°F for 12-15 minutes.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop'
    },
    { 
      id: 2, 
      name: 'Chocolate Chip Cookies', 
      ingredients: ['flour', 'butter', 'sugar', 'brown sugar', 'eggs', 'vanilla', 'baking soda', 'salt', 'chocolate chips'], 
      calories: 180, 
      prepTime: '15 min',
      cookTime: '10 min',
      servings: 24,
      instructions: '1. Cream butter and sugars.\n2. Add eggs and vanilla.\n3. Mix in dry ingredients.\n4. Fold in chocolate chips.\n5. Bake at 375°F for 9-11 minutes.',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1964&auto=format&fit=crop'
    },
  ];
  
  // Mock favorited recipes
  const favoritedRecipes = [
    { 
      id: 3, 
      name: 'Avocado Toast', 
      ingredients: ['bread', 'avocado', 'lemon juice', 'red pepper flakes', 'salt', 'olive oil'], 
      calories: 220, 
      prepTime: '5 min',
      cookTime: '5 min',
      servings: 1,
      instructions: '1. Toast bread.\n2. Mash avocado with lemon juice and salt.\n3. Spread on toast.\n4. Drizzle with olive oil and sprinkle with red pepper flakes.',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1780&auto=format&fit=crop'
    },
    { 
      id: 4, 
      name: 'Chicken Stir Fry', 
      ingredients: ['chicken breast', 'bell peppers', 'broccoli', 'carrots', 'soy sauce', 'garlic', 'ginger', 'sesame oil'], 
      calories: 350, 
      prepTime: '15 min',
      cookTime: '10 min',
      servings: 4,
      instructions: '1. Cut chicken into bite-sized pieces.\n2. Chop vegetables.\n3. Stir-fry chicken until cooked through.\n4. Add vegetables and stir-fry until tender-crisp.\n5. Add sauce and cook until thickened.',
      image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?q=80&w=1780&auto=format&fit=crop'
    },
  ];
  
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };
  
  const handleRecipeClick = (recipe) => {
    setExpandedRecipe(recipe);
  };
  
  const handleCloseExpanded = () => {
    setExpandedRecipe(null);
  };
  
  const handleDeleteRecipe = (recipeId) => {
    console.log(`Deleting recipe with ID: ${recipeId}`);
    // In a real app, this would delete from the database
  };
  
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-transition max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="glass p-8 rounded-2xl mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                <button 
                  onClick={handleEditProfile}
                  className="inline-flex items-center gap-2 btn btn-secondary px-3 py-1 text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
              
              {/* <p className="text-white/80 mb-4">{user.email}</p> */}
              <p className="text-white/90">{user.bio}</p>
            </div>
          </div>
        </div>
        
        {/* Contributed Recipes */}
        <h2 className="text-2xl font-bold text-white mb-4">My Recipes</h2>
        {contributedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {contributedRecipes.map(recipe => (
              <div key={recipe.id} className="card card-3d relative">
                <button 
                  className="absolute top-3 right-3 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  onClick={() => handleDeleteRecipe(recipe.id)}
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
                
                <div 
                  className="cursor-pointer"
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <div 
                    className="h-32 w-full bg-cover bg-center rounded-t-lg mb-3" 
                    style={{ backgroundImage: `url(${recipe.image})` }}
                  ></div>
                  
                  <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                  <p className="text-sm text-white/80 mb-2">
                    <span className="font-medium">{recipe.calories}</span> calories | 
                    <span className="font-medium ml-1">{recipe.prepTime}</span> prep
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Ingredients: </span> 
                    {recipe.ingredients.slice(0, 3).join(', ')}
                    {recipe.ingredients.length > 3 && '...'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass p-6 rounded-xl text-center mb-8">
            <p className="text-white/80">You haven't contributed any recipes yet.</p>
            <button 
              className="btn btn-primary mt-4"
              onClick={() => navigate('/add-recipe')}
            >
              Add Your First Recipe
            </button>
          </div>
        )}
        
        {/* Favorited Recipes */}
        <h2 className="text-2xl font-bold text-white mb-4">Favorite Recipes</h2>
        {favoritedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritedRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="card card-3d relative cursor-pointer"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div className="absolute top-3 right-3 p-2 bg-white/20 rounded-full">
                  <Heart className="w-4 h-4 fill-white text-white" />
                </div>
                
                <div 
                  className="h-32 w-full bg-cover bg-center rounded-t-lg mb-3" 
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                
                <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                <p className="text-sm text-white/80 mb-2">
                  <span className="font-medium">{recipe.calories}</span> calories | 
                  <span className="font-medium ml-1">{recipe.prepTime}</span> prep
                </p>
                <p className="text-sm">
                  <span className="font-medium">Ingredients: </span> 
                  {recipe.ingredients.slice(0, 3).join(', ')}
                  {recipe.ingredients.length > 3 && '...'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass p-6 rounded-xl text-center">
            <p className="text-white/80">You don't have any favorite recipes yet.</p>
            <button 
              className="btn btn-primary mt-4"
              onClick={() => navigate('/')}
            >
              Browse Recipes
            </button>
          </div>
        )}
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
                <h2 className="text-2xl font-bold mb-4">{expandedRecipe.name}</h2>
                
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

export default Profile;