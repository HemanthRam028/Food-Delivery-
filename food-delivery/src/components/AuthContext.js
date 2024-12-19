import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // You can add logic to fetch the logged-in user here
    // For example, after successful Google login, set the user data
    const userData = JSON.parse(localStorage.getItem('user')); // Retrieve from localStorage or use any other storage
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
