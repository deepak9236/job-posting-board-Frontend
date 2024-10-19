import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the token exists in localStorage
  const token = localStorage.getItem('token');

  // If token exists, render the children (protected components)
  // Otherwise, redirect to the login page
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
