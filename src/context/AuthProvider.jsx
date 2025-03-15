import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext(); // ✅ Export AuthContext properly
// Custom Hook for using AuthContext
export const useAuth = () => useContext(AuthContext); // ✅ Returns all auth functions

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulating fetching user data from local storage or API
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // ✅ Default export
