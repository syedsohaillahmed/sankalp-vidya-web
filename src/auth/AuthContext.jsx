// AuthContext.js
import { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Login function
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // Value object that will be provided to consumers
  const value = {
    isLoggedIn,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;