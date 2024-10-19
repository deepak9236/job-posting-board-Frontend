import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // Check if the token exists in localStorage
  const token = localStorage.getItem('token');

  // If token exists, redirect to the dashboard
  // Otherwise, render the children (unprotected components)
  return token ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
