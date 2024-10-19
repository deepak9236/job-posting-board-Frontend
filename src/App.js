import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Add Navigate to the import
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import JobListings from './pages/JobListings';
import OtpVerification from './pages/OtpVerification';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute
import PublicRoute from './components/PublicRoute'; // Import PublicRoute for unprotected pages

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/otp-verification"
          element={
            <PublicRoute>
              <OtpVerification />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/job-listings"
          element={
            <PrivateRoute>
              <JobListings />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/register" />} /> {/* Make sure Navigate is imported */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
