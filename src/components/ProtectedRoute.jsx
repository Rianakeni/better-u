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
  if (requiredRole && user.role && user.role.name !== requiredRole) {
    // Jika role tidak sesuai, redirect ke halaman utama
    return <Navigate to="/" replace />;
  }
  return children;
}
