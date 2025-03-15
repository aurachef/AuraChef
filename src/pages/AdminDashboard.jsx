import React, { useEffect, useState } from "react";
import { Check, X, ChevronDown, ChevronUp, RotateCw } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [pendingRecipes, setPendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5001/api/recipe/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch recipes");

        const data = await response.json();
        setPendingRecipes(data);
      } catch (error) {
        console.error("❌ Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [token]);

  const handleStatusUpdate = async (recipeId, action) => {
    try {
      const method = action === "approve" ? "PATCH" : "POST";
      const response = await fetch(
        `http://localhost:5001/api/recipe/admin/${action}/${recipeId}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${action} recipe`);
      }

      // Remove the recipe from the list after successful update
      setPendingRecipes((recipes) =>
        recipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (error) {
      console.error(`❌ Error ${action}ing recipe:`, error);
      alert(`Failed to ${action} recipe. Please try again.`);
    }
  };

  const toggleExpandRecipe = (recipe) => {
    setExpandedRecipe(expandedRecipe?._id === recipe._id ? null : recipe);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1635321593217-40050ad13c74?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
    // Replace backslashes with forward slashes for URL compatibility
    const normalizedPath = imagePath.replace(/\\/g, '/');
    return `http://localhost:5001/${normalizedPath}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-transition max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <h1 className="text-4xl font-bold text-white text-shadow mb-2">
              Admin Dashboard
            </h1>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        <Card className="glass border-none bg-white/10 backdrop-blur-lg shadow-xl mb-8 overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-semibold text-white">
                Pending Recipes
              </CardTitle>
              <div className="flex items-center">
                <div className="animate-pulse mr-2 w-2 h-2 rounded-full bg-green-400"></div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {pendingRecipes.length} recipes
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RotateCw className="w-8 h-8 animate-spin text-white/50" />
                <p className="text-white/80 mt-2">Loading recipes...</p>
              </div>
            ) : pendingRecipes.length > 0 ? (
              <div className="space-y-6">
                {pendingRecipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    className="glass bg-white/5 rounded-xl overflow-hidden transform transition-all hover:translate-y-[-5px] hover:shadow-lg group"
                  >
                    <div className="p-4 flex flex-col md:flex-row gap-4">
                      <div
                        className="md:w-32 h-24 md:h-24 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url(${getImageUrl(recipe.image)})` }}
                      ></div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <h3 className="text-xl font-semibold">
                            {recipe.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(recipe._id, "approve")
                              }
                              className="p-2 bg-green-500/20 rounded-full hover:bg-green-500/40 transition-colors transform hover:scale-110 active:scale-95"
                              title="Approve recipe"
                            >
                              <Check className="w-5 h-5 text-green-400" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(recipe._id, "reject")
                              }
                              className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/40 transition-colors transform hover:scale-110 active:scale-95"
                              title="Reject recipe"
                            >
                              <X className="w-5 h-5 text-red-400" />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/80 mb-2">
                          <p>
                            By:{" "}
                            <span className="font-medium">
                              {recipe.userId.name}
                            </span>
                          </p>
                          <p>
                            Submitted:{" "}
                            <span className="font-medium">
                              {new Date(recipe.createdAt).toLocaleDateString()}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium">
                              {recipe.caloriesPerServing}
                            </span>{" "}
                            calories
                          </p>
                          <p>
                            <span className="font-medium">
                              {recipe.prepTime}
                            </span>{" "}
                            min Prep
                          </p>
                        </div>

                        <Collapsible>
                          <CollapsibleTrigger
                            onClick={() => toggleExpandRecipe(recipe)}
                            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors text-sm"
                          >
                            {expandedRecipe?._id === recipe._id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                            <span>
                              {expandedRecipe?._id === recipe._id
                                ? "Hide details"
                                : "View details"}
                            </span>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {expandedRecipe?._id === recipe._id && (
                              <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                                <div className="grid md:grid-cols-3 gap-9">
                                  <div>
                                    <h4 className="font-semibold mb-2 flex items-center">
                                      <span className="w-1.5 h-1.5 bg-primary-light rounded-full mr-2"></span>
                                      Ingredients
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                      {recipe.ingredients.map(
                                        (ingredient, index) => (
                                          <li
                                            key={index}
                                            className="text-white/90"
                                          >
                                            {ingredient}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>

                                  <div className="md:col-span-2">
                                    <h4 className="font-semibold mb-2 flex items-center">
                                      <span className="w-1.5 h-1.5 bg-primary-light rounded-full mr-2"></span>
                                      Instructions
                                    </h4>
                                    <p className="whitespace-pre-line text-white/90">
                                      {recipe.instructions.join(". ")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-white/80">
                No pending recipes to review.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;