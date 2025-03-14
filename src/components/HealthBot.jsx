
import React, { useState, useEffect } from 'react';

const HealthBot = () => {
  const [animationState, setAnimationState] = useState('idle');
  const [tipShown, setTipShown] = useState(false);

  const handleClick = () => {
    setAnimationState('wave');
    setTimeout(() => setAnimationState('idle'), 2000);
    setTipShown(true);
    setTimeout(() => setTipShown(false), 3000);
  };

  const getAnimationClass = () => {
    switch (animationState) {
      case 'wave':
        return 'animate-bounce-slow';
      case 'float':
        return 'animate-float';
      default:
        return '';
    }
  };

  return (
    <div className="relative flex flex-col items-start justify-center">
      {tipShown && (
        <div className="absolute -top-16 glass px-4 py-2 rounded-lg animate-fade-in">
          <p className="text-white text-sm">Hello! Ask me about health tips!</p>
        </div>
      )}
      
      <div 
        className={`relative w-40 h-40 md:w-52 md:h-52 cursor-pointer transform transition-transform ${getAnimationClass()}`}
      >
        <img 
          src="bot2.png" 
          alt="Bot" 
          className="w-full h-full object-contain" 
        />
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-primary-light opacity-30 blur-2xl -z-10"></div>
      </div>
    </div>
  );
};

export default HealthBot;
