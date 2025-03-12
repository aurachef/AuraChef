
import React, { useState } from 'react';

const CalorieTracking = () => {
  const [entries, setEntries] = useState([
    { id: 1, food: 'Oatmeal with berries', calories: 320, meal: 'Breakfast', time: '08:30' },
    { id: 2, food: 'Grilled chicken salad', calories: 450, meal: 'Lunch', time: '12:45' },
    { id: 3, food: 'Apple', calories: 95, meal: 'Snack', time: '15:30' },
  ]);

  const [newEntry, setNewEntry] = useState({
    food: '',
    calories: '',
    meal: 'Breakfast',
    time: ''
  });

  const totalCalories = entries.reduce((total, entry) => total + entry.calories, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: name === 'calories' ? parseInt(value) || '' : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEntry.food || !newEntry.calories) return;
    
    const entry = {
      id: Date.now(),
      ...newEntry,
      time: newEntry.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setEntries(prev => [...prev, entry]);
    setNewEntry({
      food: '',
      calories: '',
      meal: 'Breakfast',
      time: ''
    });
  };

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-transition max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-shadow text-center mb-8">
          Calorie Tracking
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="glass p-6 rounded-xl text-center card-3d">
            <h3 className="text-xl font-semibold mb-2">Today's Calories</h3>
            <p className="text-4xl font-bold text-white">{totalCalories}</p>
          </div>
          
          <div className="glass p-6 rounded-xl text-center card-3d">
            <h3 className="text-xl font-semibold mb-2">Daily Goal</h3>
            <p className="text-4xl font-bold text-white">2,000</p>
          </div>
          
          <div className="glass p-6 rounded-xl text-center card-3d">
            <h3 className="text-xl font-semibold mb-2">Remaining</h3>
            <p className="text-4xl font-bold text-white">{2000 - totalCalories}</p>
          </div>
        </div>
        
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
        
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6">Today's Food Log</h2>
          
          {entries.length === 0 ? (
            <p className="text-white/80 text-center py-4">No entries yet. Add your first meal above!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-white font-medium">Food</th>
                    <th className="text-center py-3 px-4 text-white font-medium">Meal</th>
                    <th className="text-center py-3 px-4 text-white font-medium">Time</th>
                    <th className="text-center py-3 px-4 text-white font-medium">Calories</th>
                    <th className="text-right py-3 px-4 text-white font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(entry => (
                    <tr key={entry.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-4 text-white">{entry.food}</td>
                      <td className="py-3 px-4 text-white text-center">{entry.meal}</td>
                      <td className="py-3 px-4 text-white text-center">{entry.time}</td>
                      <td className="py-3 px-4 text-white text-center">{entry.calories}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieTracking;
