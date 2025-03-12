
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="page-transition text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white text-shadow mb-4">404</h1>
        <p className="text-2xl text-white/90 mb-8">Oops! Page not found</p>
        
        <div className="glass p-8 rounded-2xl max-w-md mx-auto">
          <p className="text-white/80 mb-6">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <Link to="/" className="btn btn-primary btn-3d inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
