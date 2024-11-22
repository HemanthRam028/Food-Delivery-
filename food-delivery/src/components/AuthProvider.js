// src/components/AuthProvider.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context for authentication
const AuthContext = createContext();

// AuthProvider component to provide auth context to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state, no user logged in

  // Function to log in user (mock implementation)
  const login = (email) => {
    // Here you can add logic to authenticate the user (e.g., via Google Auth)
    setUser({ email }); // Set user with email
  };

  // Function to log out user
  const logout = () => {
    setUser(null); // Reset user state to null
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
