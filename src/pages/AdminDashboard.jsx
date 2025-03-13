
import React, { useEffect, useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, RotateCw, Settings, Activity, Database } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const token = localStorage.getItem('token');
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [pendingRecipes, setPendingRecipes] = useState([
    { 
      id: 1, 
      name: 'Green Smoothie Bowl', 
      author: 'user123',
      ingredients: ['spinach', 'banana', 'almond milk', 'chia seeds', 'honey', 'granola', 'berries'], 
      calories: 320, 
      prepTime: '10 min',
      cookTime: '0 min',
      servings: 1,
      instructions: '1. Add spinach, banana, and almond milk to a blender.\n2. Blend until smooth.\n3. Pour into a bowl.\n4. Top with chia seeds, granola, and berries.\n5. Drizzle with honey.',
      image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1824&auto=format&fit=crop',
      status: 'pending',
      submittedDate: '2023-06-12'
    },
    { 
      id: 2, 
      name: 'Veggie Pasta', 
      author: 'healthyeater42',
      ingredients: ['whole grain pasta', 'zucchini', 'bell peppers', 'cherry tomatoes', 'olive oil', 'garlic', 'basil', 'parmesan'], 
      calories: 380, 
      prepTime: '15 min',
      cookTime: '12 min',
      servings: 4,
      instructions: '1. Cook pasta according to package directions.\n2. Sauté garlic in olive oil.\n3. Add chopped vegetables and cook until tender.\n4. Toss pasta with vegetables.\n5. Garnish with basil and parmesan.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1780&auto=format&fit=crop',
      status: 'pending',
      submittedDate: '2023-06-10'
    },
    { 
      id: 3, 
      name: 'Quinoa Salad', 
      author: 'veganlover55',
      ingredients: ['quinoa', 'cucumber', 'cherry tomatoes', 'red onion', 'feta cheese', 'olive oil', 'lemon juice', 'mint'], 
      calories: 290, 
      prepTime: '15 min',
      cookTime: '15 min',
      servings: 3,
      instructions: '1. Cook quinoa according to package directions and let cool.\n2. Chop vegetables.\n3. Mix quinoa and vegetables in a bowl.\n4. Whisk together olive oil and lemon juice for dressing.\n5. Pour dressing over salad and toss.\n6. Add feta cheese and mint before serving.',
      image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1887&auto=format&fit=crop',
      status: 'pending',
      submittedDate: '2023-06-08'
    },
  ]);
  
  const handleApprove = (recipeId) => {
    console.log(`Approving recipe with ID: ${recipeId}`);
    setPendingRecipes(recipes => 
      recipes.map(recipe => 
        recipe.id === recipeId ? { ...recipe, status: 'approved' } : recipe
      ).filter(recipe => recipe.id !== recipeId)
    );
    
    if (expandedRecipe?.id === recipeId) {
      setExpandedRecipe(null);
    }
  };
  
  const handleReject = (recipeId) => {
    console.log(`Rejecting recipe with ID: ${recipeId}`);
    setPendingRecipes(recipes => 
      recipes.map(recipe => 
        recipe.id === recipeId ? { ...recipe, status: 'rejected' } : recipe
      ).filter(recipe => recipe.id !== recipeId)
    );
    
    if (expandedRecipe?.id === recipeId) {
      setExpandedRecipe(null);
    }
  };
  
  const toggleExpandRecipe = (recipe) => {
    setExpandedRecipe(expandedRecipe?.id === recipe.id ? null : recipe);
  };

  useEffect(()=>{
const fetchRecipes = async()=>{
  try {
    const response = await fetch("http://localhost:5001/api/recipe/admin", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();
    setPendingRecipes(data)
  } catch (error) {
    console.error("❌ Error searching recipes:", error);
  }


}
fetchRecipes()
  },[])
  
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
          
          {/* <div className="flex mt-8 mb-6 space-x-6"> */}
            {/* <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-lg glass flex items-center justify-center mb-2 transform hover:rotate-12 transition-transform relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-full h-full bg-gradient-radial from-white/20 to-transparent"></div>
                </div>
                <Activity className="w-6 h-6 z-10" />
              </div>
              <span className="text-sm">Activity</span>
            </div> */}
            
            {/* <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-lg glass flex items-center justify-center mb-2 transform hover:rotate-12 transition-transform relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-full h-full bg-gradient-radial from-white/20 to-transparent"></div>
                </div>
                <Database className="w-6 h-6 z-10" />
              </div>
              <span className="text-sm">Database</span>
            </div> */}
            
            {/* <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-lg glass flex items-center justify-center mb-2 transform hover:rotate-12 transition-transform relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-full h-full bg-gradient-radial from-white/20 to-transparent"></div>
                </div>
                <Settings className="w-6 h-6 z-10" />
              </div>
              <span className="text-sm">Settings</span>
            </div> */}
          {/* </div> */}
        </div>
        
        <Card className="glass border-none bg-white/10 backdrop-blur-lg shadow-xl mb-8 overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-semibold text-white">Pending Recipes</CardTitle>
              <div className="flex items-center">
                <div className="animate-pulse mr-2 w-2 h-2 rounded-full bg-green-400"></div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {pendingRecipes.length} recipes
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {pendingRecipes.length > 0 ? (
              <div className="space-y-6">
                {pendingRecipes.map(recipe => (
                  <div 
                    key={recipe.id} 
                    className="glass bg-white/5 rounded-xl overflow-hidden transform transition-all hover:translate-y-[-5px] hover:shadow-lg group"
                  >
                    <div className="p-4 flex flex-col md:flex-row gap-4">
                      <div 
                        className="md:w-32 h-24 md:h-24 bg-cover bg-center rounded-lg relative overflow-hidden"
                        style={{ backgroundImage: `url(${recipe.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{recipe.name}</h3>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleApprove(recipe._id)}
                              className="p-2 bg-green-500/20 rounded-full hover:bg-green-500/40 transition-colors transform hover:scale-110 active:scale-95"
                              title="Approve recipe"
                            >
                              <Check className="w-5 h-5 text-green-400" />
                            </button>
                            <button 
                              onClick={() => handleReject(recipe.id)}
                              className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/40 transition-colors transform hover:scale-110 active:scale-95"
                              title="Reject recipe"
                            >
                              <X className="w-5 h-5 text-red-400" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/80 mb-2">
                          <p>By: <span className="font-medium">{recipe.author}</span></p>
                          <p>Submitted: <span className="font-medium">{recipe.submittedDate}</span></p>
                          <p><span className="font-medium">{recipe.calories}</span> calories</p>
                          <p><span className="font-medium">{recipe.prepTime}</span> prep</p>
                        </div>
                        
                        <Collapsible>
                          <CollapsibleTrigger
                            onClick={() => toggleExpandRecipe(recipe)}
                            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors text-sm"
                          >
                            {expandedRecipe?.id === recipe.id ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                <span>Hide details</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                <span>View details</span>
                              </>
                            )}
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent>
                            {expandedRecipe?.id === recipe.id && (
                              <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold mb-2 flex items-center">
                                      <span className="w-1.5 h-1.5 bg-primary-light rounded-full mr-2"></span>
                                      Ingredients
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                      {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index} className="text-white/90">{ingredient}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold mb-2 flex items-center">
                                      <span className="w-1.5 h-1.5 bg-primary-light rounded-full mr-2"></span>
                                      Instructions
                                    </h4>
                                    <p className="whitespace-pre-line text-white/90">{recipe.instructions}</p>
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
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 mb-4 rounded-full glass flex items-center justify-center">
                  <RotateCw className="w-8 h-8 text-white/50" />
                </div>
                <p className="text-white/80 mb-2">No pending recipes to review.</p>
                <p className="text-white/60">All recipes have been reviewed!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;