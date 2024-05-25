import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
  isAuthenticated: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  isAuthenticated,
  redirectTo,
}) => {
  return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
