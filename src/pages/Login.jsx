
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Here we'd normally send a request to the backend
    // For now, we'll just simulate a login
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'test@example.com' && password === 'password') {
        // Login successful
        console.log('Login successful');
        navigate('/');
      } else {
        // Login failed
        setError('Invalid email or password');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="glass p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/70 mt-2">Log in to your account</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full glass py-3 px-4 text-white placeholder-white/50 rounded-lg outline-none focus:ring-2 focus:ring-white/30 transition-all"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="text-white font-medium">Password</label>
                <a href="#" className="text-secondary-light hover:text-white text-sm transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                className="w-full glass py-3 px-4 text-white placeholder-white/50 rounded-lg outline-none focus:ring-2 focus:ring-white/30 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 h-4 w-4"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="text-white">Remember me</label>
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary btn-3d flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white">
              Don't have an account?{' '}
              <Link to="/signup" className="text-secondary-light hover:text-white transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
