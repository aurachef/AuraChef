
import React, { useState } from 'react';

const TDEECalculator = ({ onCalculationComplete }) => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'sedentary',
    goal: 'maintenance'
  });

  const [calculationResult, setCalculationResult] = useState(null);

  const activityFactors = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    superActive: 1.9
  };

  const goalAdjustments = {
    loss: -500,
    maintenance: 0,
    gain: 300
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateBMR = () => {
    const { age, weight, height, gender } = formData;
    
    // Convert to numbers
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    
    // Harris-Benedict BMR Formula
    if (gender === 'male') {
      return 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum);
    } else {
      return 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);
    }
  };

  const calculateTDEE = (bmr) => {
    return bmr * activityFactors[formData.activityLevel];
  };

  const calculateCalorieGoal = (tdee) => {
    return Math.round(tdee + goalAdjustments[formData.goal]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const bmr = calculateBMR();
    const tdee = calculateTDEE(bmr);
    const calorieGoal = calculateCalorieGoal(tdee);
    
    const result = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calorieGoal
    };
    
    setCalculationResult(result);
    
    if (onCalculationComplete) {
      onCalculationComplete(result);
    }
  };

  return (
    <div className="glass p-8 rounded-2xl mb-8">
      <h2 className="text-2xl font-semibold mb-6">Calculate Your Calorie Needs</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="age" className="block text-white font-medium mb-2">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="15"
              max="100"
              value={formData.age}
              onChange={handleChange}
              className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter your age"
              required
            />
          </div>
          
          <div>
            <label htmlFor="gender" className="block text-white font-medium mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="weight" className="block text-white font-medium mb-2">
              Weight (kg)
            </label>
            <input
              id="weight"
              name="weight"
              type="number"
              min="30"
              max="250"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
              className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter your weight"
              required
            />
          </div>
          
          <div>
            <label htmlFor="height" className="block text-white font-medium mb-2">
              Height (cm)
            </label>
            <input
              id="height"
              name="height"
              type="number"
              min="100"
              max="250"
              step="0.1"
              value={formData.height}
              onChange={handleChange}
              className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter your height"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="activityLevel" className="block text-white font-medium mb-2">
            Activity Level
          </label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="sedentary">Sedentary (Little to no exercise)</option>
            <option value="lightlyActive">Lightly Active (1-3 days/week)</option>
            <option value="moderatelyActive">Moderately Active (3-5 days/week)</option>
            <option value="veryActive">Very Active (6-7 days/week)</option>
            <option value="superActive">Super Active (Athlete, hard exercise)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="goal" className="block text-white font-medium mb-2">
            Your Goal
          </label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="loss">Weight Loss (500 cal deficit)</option>
            <option value="maintenance">Weight Maintenance</option>
            <option value="gain">Weight Gain (300 cal surplus)</option>
          </select>
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary btn-3d px-8"
          >
            Calculate
          </button>
        </div>
      </form>
      
      {calculationResult && (
        <div className="mt-8 pt-6 border-t border-white/20">
          <h3 className="text-xl font-semibold mb-4">Your Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass bg-white/10 p-4 rounded-lg text-center">
              <p className="text-sm text-white/80 mb-1">Basal Metabolic Rate</p>
              <p className="text-2xl font-bold">{calculationResult.bmr} kcal</p>
            </div>
            
            <div className="glass bg-white/10 p-4 rounded-lg text-center">
              <p className="text-sm text-white/80 mb-1">Total Daily Energy</p>
              <p className="text-2xl font-bold">{calculationResult.tdee} kcal</p>
            </div>
            
            <div className="glass bg-white/15 p-4 rounded-lg text-center">
              <p className="text-sm text-white/80 mb-1">Recommended Daily Calories</p>
              <p className="text-2xl font-bold">{calculationResult.calorieGoal} kcal</p>
            </div>
          </div>
          
          <p className="text-white/80 mt-4 text-sm text-center">
            These calculations provide an estimate. Your actual needs may vary based on individual factors.
          </p>
        </div>
      )}
    </div>
  );
};

export default TDEECalculator;
