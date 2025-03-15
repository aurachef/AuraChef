import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Edit2, Heart, Trash2, LogOut, Percent, Flame, Clock, X, Star } from "lucide-react";
import { useAuth } from "../context/AuthProvider";

const Profile = () => {
  const navigate = useNavigate();
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const { user, logout } = useAuth();
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const contributedRecipes = [
    {
      id: 1,
      name: "Homemade Pizza",
      ingredients: ["flour", "yeast", "olive oil", "salt", "tomato sauce", "cheese", "toppings"],
      calories: 320,
      prepTime: "30 min",
      cookTime: "15 min",
      servings: 4,
      instructions:
        "1. Mix flour, yeast, oil, and salt to make dough.\n2. Let rise for 1 hour.\n3. Roll out and add sauce, cheese, and toppings.\n4. Bake at 450°F for 12-15 minutes.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const fetchFavoritedRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/favourites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorited recipes");
        }

        const data = await response.json();
        setFavoritedRecipes(data);
      } catch (error) {
        console.error("❌ Error fetching favorited recipes:", error);
      }
    };

    if (user) {
      fetchFavoritedRecipes();
    }
  }, [user, token]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRecipeClick = (recipe) => {
    setExpandedRecipe(recipe);
  };

  const handleCloseExpanded = () => {
    setExpandedRecipe(null);
  };

  const handleFavoriteToggle = async (recipeId) => {
    if (!token) {
      alert("You must be logged in to favorite recipes!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/favourites/toggle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ recipeId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      const data = await response.json();
      if (data.isFavorited) {
        setFavoritedRecipes([...favoritedRecipes, expandedRecipe]);
      } else {
        setFavoritedRecipes(favoritedRecipes.filter(r => r._id !== recipeId));
      }
    } catch (error) {
      console.error("❌ Error updating favorite:", error.message);
    }
  };

  const handleRatingChange = async (rating, recipeId) => {
    if (!token) {
      alert("You must be logged in to rate!");
      navigate("/login");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/api/rating/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipeId,
          rating,
          review: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to rate recipe");
      }

      const data = await response.json();
      setUserRating(data.rating);
    } catch (error) {
      console.error("❌ Error submitting rating:", error.message);
    }
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
                <h1 className="text-3xl font-bold text-white pt-6">Welcome<br/>
                  {user?.username}
                </h1>
                <button
                  onClick={handleEditProfile}
                  className="inline-flex items-center gap-2 btn btn-secondary px-3 py-1 text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 btn btn-secondary px-3 py-1 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
              <p className="text-white/90">{user?.bio}</p>
            </div>
          </div>
        </div>

        {/* Contributed Recipes */}
        <h2 className="text-2xl font-bold text-white mb-4">My Recipes</h2>
        {contributedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {contributedRecipes.map((recipe) => (
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
                    <span className="font-medium">{recipe.calories}</span>{" "}
                    calories |
                    <span className="font-medium ml-1">{recipe.prepTime}</span>{" "}
                    prep
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Ingredients: </span>
                    {recipe.ingredients.slice(0, 3).join(", ")}
                    {recipe.ingredients.length > 3 && "..."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass p-6 rounded-xl text-center mb-8">
            <p className="text-white/80">
              You haven't contributed any recipes yet.
            </p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate("/add-recipe")}
            >
              Add Your First Recipe
            </button>
          </div>
        )}

        {/* Favorited Recipes */}
        <h2 className="text-2xl font-bold text-white mb-6">Favorite Recipes</h2>
        {favoritedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritedRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-xl hover:shadow-purple-500/10 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">
                    {recipe.title}
                  </h4>
                  <button
                    className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteToggle(recipe._id);
                    }}
                  >
                    <Heart className="w-4 h-4 fill-white text-white" />
                  </button>
                </div>

                <img
                  src={`http://localhost:5001/${recipe.image}`}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <div className="flex gap-4 mb-3">
                  <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg backdrop-blur-sm">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-white/90">{recipe.caloriesPerServing} cal</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg backdrop-blur-sm">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white/90">{recipe.prepTime} min</span>
                  </div>
                </div>

                <div className="bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                  <p className="text-sm text-white/80">
                    <span className="text-white/60">Ingredients: </span>
                    {recipe.ingredients.slice(0, 3).join(', ')}
                    {recipe.ingredients.length > 3 && '...'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass p-6 rounded-xl text-center">
            <p className="text-white/80">
              You don't have any favorite recipes yet.
            </p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate("/")}
            >
              Browse Recipes
            </button>
          </div>
        )}
      </div>

      {/* Expanded Recipe Modal */}
      {expandedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleCloseExpanded}
          />
          <div className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-xl p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10 border border-white/20">
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              onClick={handleCloseExpanded}
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={expandedRecipe.image ? `http://localhost:5001/${expandedRecipe.image}` : expandedRecipe.image}
                    alt={expandedRecipe.title || expandedRecipe.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                  {expandedRecipe.title || expandedRecipe.name}
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-sm text-white/60">Prep Time</p>
                    <p className="font-medium">{expandedRecipe.prepTime}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-sm text-white/60">Cook Time</p>
                    <p className="font-medium">{expandedRecipe.cookTime}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-sm text-white/60">Servings</p>
                    <p className="font-medium">{expandedRecipe.servings}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-sm text-white/60">Calories</p>
                    <p className="font-medium">{expandedRecipe.caloriesPerServing || expandedRecipe.calories}/serving</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <button
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    onClick={() => handleFavoriteToggle(expandedRecipe._id)}
                  >
                    <Heart className={`h-5 w-5 ${favoritedRecipes.some(r => r._id === expandedRecipe._id) ? "fill-white" : ""} text-white`} />
                  </button>

                  <div className="flex bg-white/5 p-2 rounded-lg backdrop-blur-sm border border-white/10">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingChange(star, expandedRecipe._id)}
                        className="focus:outline-none px-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            star <= userRating
                              ? "fill-white text-white"
                              : "text-white/50"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                  Ingredients
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {expandedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-white/90">{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                  Instructions
                </h3>
                <div className="space-y-3">
                  {Array.isArray(expandedRecipe.instructions) ? (
                    expandedRecipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <p className="text-white/90">{instruction}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-white/90">{expandedRecipe.instructions}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;