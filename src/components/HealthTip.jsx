
import React, { useState, useEffect } from 'react';

const tips = [
  "Eating eggs provides high-quality protein and essential nutrients.",
  "Drinking water before meals can help you eat less and lose weight.",
  "Berries are among the most antioxidant-rich foods you can eat.",
  "Greek yogurt contains probiotics that support gut health.",
  "Almonds are high in healthy fats, protein, and vitamin E.",
  "Dark chocolate with 70%+ cocoa is rich in antioxidants.",
  "Turmeric contains curcumin, which has powerful anti-inflammatory properties.",
  "Green tea is loaded with antioxidants and nutrients that improve brain function.",
  "Fatty fish like salmon is a great source of omega-3 fatty acids.",
  "Avocados are high in heart-healthy monounsaturated fats.",
  "Leafy greens are an excellent source of many vitamins, minerals, and antioxidants.",
  "Garlic has immune-boosting properties and can help lower blood pressure.",
  "Eating slowly helps you feel more full and can promote weight loss.",
  "Getting enough sleep is crucial for weight management and overall health.",
  "Regular exercise helps maintain a healthy metabolism and reduce stress.",
];

const HealthTip = () => {
  const [currentTip, setCurrentTip] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set initial tip
    setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    
    // Change tip every 10 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
        setIsVisible(true);
      }, 500);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mt-10 max-w-xl mx-auto">
      <div 
        className={`glass px-6 py-4 rounded-xl transform transition-all duration-500 animate-pulse ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <p className="text-white">{currentTip}</p>
      </div>
    </div>
  );
};

export default HealthTip;
