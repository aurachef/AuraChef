
import React, { useState } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // In a real app, this would handle authentication
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
      <div className="page-transition w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-shadow text-center mb-8">
          Admin Login
        </h1>
        
        <div className="glass p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-white font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded bg-white/5 border-white/20 focus:ring-white/50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm text-white hover:text-secondary-light">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full btn btn-primary btn-3d"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
