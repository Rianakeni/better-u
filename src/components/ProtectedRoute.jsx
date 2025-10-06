import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Komponen ini membungkus halaman yang hanya boleh diakses user login
export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ fontSize: 24, color: "#888" }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If children is a function, pass the user object
  if (typeof children === "function") {
    return children({ user });
  }

  // Check required role if specified
  if (requiredRole && user.role && user.role.name !== requiredRole) {
    // Redirect based on actual role
    if (user.role.name === "counselor") {
      return <Navigate to="/counselor/dashboard" replace />;
    } else if (user.role.name === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}
