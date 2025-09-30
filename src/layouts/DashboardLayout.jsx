import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1a202c", // Sidebar gelap
    color: "white",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
  },
  sidebarTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "40px",
    textAlign: "center",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  navLink: {
    textDecoration: "none",
    color: "#a0aec0", // Teks abu-abu
    padding: "12px 16px",
    borderRadius: "8px",
    transition: "background-color 0.2s, color 0.2s",
  },
  // Style untuk link yang sedang aktif akan ditangani oleh NavLink
  content: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f7fafc", // Latar konten abu-abu terang
  },
};

// Style untuk link yang aktif
const activeLinkStyle = {
  backgroundColor: "#2d3748",
  color: "white",
};

function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <div>
          <h2 style={styles.sidebarTitle}>Better-U</h2>
          {/* Tampilkan nama dan role user */}
          {user && (
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>
                {user.username || user.email}
              </div>
              <div style={{ fontSize: 13, color: "#cbd5e1" }}>
                {user.role?.name
                  ? user.role.name.charAt(0).toUpperCase() +
                    user.role.name.slice(1)
                  : ""}
              </div>
            </div>
          )}
          <nav style={styles.nav}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive && activeLinkStyle),
              })}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/booking"
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive && activeLinkStyle),
              })}
            >
              Buat Janji
            </NavLink>
            <NavLink
              to="/my-schedule"
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive && activeLinkStyle),
              })}
            >
              Jadwal Saya
            </NavLink>
            <NavLink
              to="/history"
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive && activeLinkStyle),
              })}
            >
              Riwayat
            </NavLink>
            <NavLink
              to="/profile"
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive && activeLinkStyle),
              })}
            >
              Profil
            </NavLink>
          </nav>
          {/* Menu Rekam Medis khusus konselor, letakkan di luar nav agar selalu muncul di sidebar konselor */}
          {user?.role?.name === "counselor" && (
            <NavLink
              to="/counselor/rekam-medis/1"
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive && activeLinkStyle),
                marginTop: 12,
              })}
            >
              Rekam Medis
            </NavLink>
          )}
        </div>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            width: "100%",
            padding: "12px 0",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#e53e3e",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          Logout
        </button>
      </aside>
      <main style={styles.content}>{children}</main>
    </div>
  );
}

export default DashboardLayout;
