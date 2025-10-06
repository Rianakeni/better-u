import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import MySchedulePage from "./pages/MySchedulePage.jsx";
import CounselorDashboard from "./pages/counselor/CounselorDashboard";
import RekamMedisPage from "./pages/counselor/RekamMedisPage";
import StudentDashboard from "./pages/student/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {({ user }) => {
                  if (user?.role?.name === "counselor") {
                    return <Navigate to="/counselor/dashboard" replace />;
                  } else if (user?.role?.name === "student") {
                    return <Navigate to="/student/dashboard" replace />;
                  }
                  return <Navigate to="/login" replace />;
                }}
              </ProtectedRoute>
            }
          />
          {/* Dashboard khusus student */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute requiredRole="student">
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          {/* Dashboard khusus counselor */}
          <Route
            path="/counselor/dashboard"
            element={
              <ProtectedRoute requiredRole="counselor">
                <DashboardLayout>
                  <CounselorDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute requiredRole="student">
                <DashboardLayout>
                  <BookingPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-schedule"
            element={
              <ProtectedRoute requiredRole="student">
                <DashboardLayout>
                  <MySchedulePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute requiredRole="student">
                <DashboardLayout>
                  <HistoryPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            }
          />
          <Route
            path="/counselor/rekam-medis/:jadwalId"
            element={
              <ProtectedRoute requiredRole="counselor">
                <DashboardLayout>
                  <RekamMedisPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
