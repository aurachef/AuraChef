import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
export const AuthContext = createContext(); // ✅ Export AuthContext properly
// Custom Hook for using AuthContext
export const useAuth = () => useContext(AuthContext); // ✅ Returns all auth functions

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    
    // Simulating fetching user data from local storage or API
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser!==null) {
      setUser(storedUser);
    }
  }, [location.pathname]);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // ✅ Default export
