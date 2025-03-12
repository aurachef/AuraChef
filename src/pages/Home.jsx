
import React from 'react';
import HealthBot from '../components/HealthBot';
import SearchBar from '../components/SearchBar';
import HealthTip from '../components/HealthTip';

const Home = () => {
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // In a real app, this would trigger a search
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="page-transition flex flex-col items-center max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-shadow mb-4">
            Your AI Health Assistant
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get personalized health and nutrition tips from your friendly AI assistant.
            Discover recipes, track calories, and improve your wellbeing.
          </p>
        </div>

        <HealthBot />
        
        <SearchBar onSearch={handleSearch} />
        
        <HealthTip />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {/* Feature Cards */}
          <div className="card card-3d">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Recipes</h3>
              <p className="text-white/80">Discover delicious and nutritious recipes tailored to your dietary preferences.</p>
            </div>
          </div>
          
          <div className="card card-3d">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calorie Tracking</h3>
              <p className="text-white/80">Track your daily calorie intake and get insights to maintain a balanced diet.</p>
            </div>
          </div>
          
          <div className="card card-3d">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Tips</h3>
              <p className="text-white/80">Get instant health and nutrition tips to improve your daily habits.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <button className="btn btn-primary btn-3d">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
