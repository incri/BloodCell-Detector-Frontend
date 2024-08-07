import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './components/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAuth = true, requireAdmin = false }) => {
  const { isAuthenticated, user } = useAuth();

  // If authentication is required and the user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If admin authorization is required and the user is neither a hospital admin nor a superuser
  if (requireAdmin && (!user?.is_hospital_admin && !user?.is_superuser)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // If all checks pass, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
