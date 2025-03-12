
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useScroll from '../hooks/use-scroll';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, scrollDirection } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    //{ name: 'Admin Login', path: '/admin-login' },
    { name: 'Add Recipe', path: '/add-recipe' },
    { name: 'Calorie Tracking', path: '/calorie-tracking' },
    { name: 'About', path: '/about' },
  ];

  const handleProfileClick = () => {
    navigate('/login');
  };

  const navbarClass = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out nav-glass ${
    scrolled && scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
  }`;

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-shadow text-white text-3xl font-bold hover:text-secondary-light transition-colors"
          >
            AuraChef
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-white hover:text-secondary-light transition-colors ${
                  location.pathname === link.path ? 'font-bold' : 'font-medium'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Profile Icon */}
            <div 
              className="h-10 w-10 rounded-full bg-white/20 border-2 border-white/50 overflow-hidden flex items-center justify-center hover:border-white transition-all cursor-pointer"
              onClick={handleProfileClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <div 
              className="h-10 w-10 rounded-full bg-white/20 border-2 border-white/50 overflow-hidden flex items-center justify-center hover:border-white transition-all mr-3 cursor-pointer"
              onClick={handleProfileClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="absolute top-16 right-4 w-48 glass rounded-lg py-2 shadow-lg md:hidden animate-fade-in">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
