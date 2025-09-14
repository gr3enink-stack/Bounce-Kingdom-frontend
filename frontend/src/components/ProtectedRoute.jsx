import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService.js';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const authenticated = isAuthenticated();
  
  // If not authenticated, redirect to login page
  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;