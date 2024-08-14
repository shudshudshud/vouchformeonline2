import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute Component to protect routes
const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists in localStorage
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
