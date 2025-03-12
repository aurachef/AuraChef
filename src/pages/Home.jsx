import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HealthBot from "../components/HealthBot";
import SearchBar from "../components/SearchBar";
import HealthTip from "../components/HealthTip";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const mockRecipes = [
    {
      id: 1,
      name: "Banana Smoothie",
      ingredients: ["banana", "milk", "honey", "ice"],
      calories: 250,
      prepTime: "5 min",
    },
    {
      id: 2,
      name: "Banana Pancakes",
      ingredients: ["banana", "flour", "egg", "milk", "baking powder"],
      calories: 350,
      prepTime: "15 min",
    },
    {
      id: 3,
      name: "Fruit Salad",
      ingredients: ["banana", "apple", "orange", "grapes", "yogurt"],
      calories: 180,
      prepTime: "10 min",
    },
    {
      id: 4,
      name: "Cereal with Milk",
      ingredients: ["milk", "cereal", "honey"],
      calories: 220,
      prepTime: "2 min",
    },
    {
      id: 5,
      name: "Oatmeal",
      ingredients: ["oats", "milk", "banana", "cinnamon", "walnuts"],
      calories: 300,
      prepTime: "10 min",
    },
  ];

  const handleSearch = (searchIngredients) => {
    console.log("Searching for ingredients:", searchIngredients);

    const results = mockRecipes
      .map((recipe) => {
        const matchCount = searchIngredients.filter((ing) =>
          recipe.ingredients.some((recipeIng) =>
            recipeIng.includes(ing.toLowerCase())
          )
        ).length;

        return {
          recipe,
          matchCount,
          matchPercentage: (matchCount / searchIngredients.length) * 100,
        };
      })
      .filter((item) => item.matchCount > 0);

    results.sort((a, b) => b.matchCount - a.matchCount);

    setSearchResults(
      results.map((item) => ({
        ...item.recipe,
        matchCount: item.matchCount,
        matchPercentage: item.matchPercentage,
      }))
    );

    setHasSearched(true);
  };

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-transition flex flex-col items-center max-w-5xl mx-auto">

        <HealthBot />

        <HealthTip />

        <div className="w-full max-w-4xl mb-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Find Recipes by Ingredients
          </h2>
          <SearchBar onSearch={handleSearch} />
        </div>

        {hasSearched && (
          <div className="w-full max-w-4xl my-8">
            <h3 className="text-xl font-semibold mb-4">
              {searchResults.length > 0
                ? `Found ${searchResults.length} recipes`
                : "No recipes found"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((recipe) => (
                <div key={recipe.id} className="card card-3d">
                  <h4 className="text-lg font-semibold mb-2">{recipe.name}</h4>
                  <p className="text-sm text-white/80 mb-2">
                    <span className="font-medium">{recipe.calories}</span>{" "}
                    calories |
                    <span className="font-medium ml-1">{recipe.prepTime}</span>
                  </p>
                  <div className="mb-3">
                    <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                      {Math.round(recipe.matchPercentage)}% match
                    </span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Ingredients: </span>
                    {recipe.ingredients.join(", ")}
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
    </div>
  );
};

export default Home;
