// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const user = getUser();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is not allowed, redirect to login
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // Authorized, render children
  return <>{children}</>;
};

export default PrivateRoute;
