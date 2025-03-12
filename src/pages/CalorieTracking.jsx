
import React, { useState } from 'react';
import TDEECalculator from '../components/TDEECalculator';
import StatsDisplay from '../components/calorie-tracking/StatsDisplay';
import FoodEntryForm from '../components/calorie-tracking/FoodEntryForm';
import FoodLogTable from '../components/calorie-tracking/FoodLogTable';

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

  const [calorieGoal, setCalorieGoal] = useState(2000);
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

  const handleCalorieGoalChange = (newGoal) => {
    setCalorieGoal(newGoal);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-transition max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-shadow text-center mb-8">
          Calorie Tracking
        </h1>
        
        <StatsDisplay totalCalories={totalCalories} calorieGoal={calorieGoal} />
        
        {/* TDEE Calculator */}
        <TDEECalculator onCalorieGoalChange={handleCalorieGoalChange} />
        
        <FoodEntryForm 
          newEntry={newEntry} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
        />
        
        <FoodLogTable entries={entries} deleteEntry={deleteEntry} />
      </div>
    </div>
  );
};

export default CalorieTracking;
