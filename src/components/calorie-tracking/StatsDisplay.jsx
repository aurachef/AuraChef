
import React from 'react';

const StatsDisplay = ({ totalCalories, calorieGoal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div className="glass p-6 rounded-xl text-center card-3d">
        <h3 className="text-xl font-semibold mb-2">Today's Calories</h3>
        <p className="text-4xl font-bold text-white">{totalCalories}</p>
      </div>
      
      <div className="glass p-6 rounded-xl text-center card-3d">
        <h3 className="text-xl font-semibold mb-2">Daily Goal</h3>
        <p className="text-4xl font-bold text-white">{calorieGoal}</p>
      </div>
      
      <div className="glass p-6 rounded-xl text-center card-3d">
        <h3 className="text-xl font-semibold mb-2">Remaining</h3>
        <p className="text-4xl font-bold text-white">{calorieGoal - totalCalories}</p>
      </div>
    </div>
  );
};

export default StatsDisplay;
