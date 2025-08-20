import React from "react";
import { Link, NavLink } from "react-router-dom";

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
  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Better-U</h2>
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
      </aside>
      <main style={styles.content}>{children}</main>
    </div>
  );
}

export default DashboardLayout;
