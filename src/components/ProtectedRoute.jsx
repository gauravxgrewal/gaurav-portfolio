// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!currentUser) {
    // User not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // User logged in, but wrong role
    // Redirect them to their 'home' dashboard
    const homeDahboard = currentUser.role === 'student' ? '/student' : '/teacher';
    return <Navigate to={homeDahboard} state={{ from: location }} replace />;
  }

  // User is logged in AND has the correct role
  return children;
};

export default ProtectedRoute;