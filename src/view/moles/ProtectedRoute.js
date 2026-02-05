import React from "react";
import { Navigate } from "react-router-dom";

// This is a placeholder for authentication logic
// In a real application, this would check actual auth state
const useAuth = () => {
  // TODO: Replace with actual authentication logic
  // For now, return false to demonstrate the redirect
  // You can set this to true for testing protected routes
  const isAuthenticated = false;
  return isAuthenticated;
};

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
