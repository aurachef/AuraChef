
import React from 'react';

const FoodEntryForm = ({ newEntry, handleChange, handleSubmit }) => {
  return (
    <div className="glass p-8 rounded-2xl mb-8">
      <h2 className="text-2xl font-semibold mb-6">Add Food Entry</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="food" className="block text-white font-medium mb-2">
              Food Name
            </label>
            <input
              id="food"
              name="food"
              type="text"
              value={newEntry.food}
              onChange={handleChange}
              className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter food name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="calories" className="block text-white font-medium mb-2">
              Calories
            </label>
            <input
              id="calories"
              name="calories"
              type="number"
              value={newEntry.calories}
              onChange={handleChange}
              className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter calories"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="meal" className="block text-white font-medium mb-2">
              Meal Type
            </label>
            <select
              id="meal"
              name="meal"
              value={newEntry.meal}
              onChange={handleChange}
              className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="time" className="block text-white font-medium mb-2">
              Time (optional)
            </label>
            <input
              id="time"
              name="time"
              type="time"
              value={newEntry.time}
              onChange={handleChange}
              className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary btn-3d px-8"
          >
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodEntryForm;
