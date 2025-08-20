import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Cek 'tanda pengenal' di localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    // Jika tidak ada 'tanda pengenal', tendang ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika ada, tampilkan halaman yang diminta (children)
  return children;
}

export default ProtectedRoute;
