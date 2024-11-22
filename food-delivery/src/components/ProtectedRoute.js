// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';  // A custom hook to get user info

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user?.email === 'hemanthram064@gmail.com' ? children : <Navigate to="/user" />;
};

export default ProtectedRoute;
