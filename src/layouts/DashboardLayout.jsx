import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  CalendarPlus,
  CalendarClock,
  History,
  User,
} from "lucide-react";

import useWindowSize from "../hooks/useWindowSize";

// Style untuk link yang sedang aktif
const activeLinkStyle = {
  backgroundColor: "#ffffff",
  color: "#000000",
  fontWeight: "bold",
};

// Definisikan menu untuk setiap peran
const studentMenu = [
  {
    path: "/student/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    path: "/booking",
    label: "Booking Janji",
    icon: <CalendarPlus size={20} />,
  },
  {
    path: "/my-schedule",
    label: "Jadwal Anda",
    icon: <CalendarClock size={20} />,
  },
  { path: "/history", label: "Riwayat", icon: <History size={20} /> },
  { path: "/profile", label: "Profil", icon: <User size={20} /> },
];

const counselorMenu = [
  {
    path: "/counselor/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  // Nanti kita tambahkan link untuk halaman lain konselor
];

function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { width } = useWindowSize(); // Tambahkan ini
  const isMobile = width < 768; //

  const styles = {
    layout: (isMobile) => ({
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Berubah saat mobile
      minHeight: "100vh",
      fontFamily: "sans-serif",
    }),
    sidebar: (isMobile) => ({
      width: isMobile ? "100%" : "250px", // Berubah saat mobile
      padding: "24px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRight: "1px solid #e0e0e0",
    }),
    profileSection: { textAlign: "center", marginBottom: "40px" },
    avatar: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      backgroundColor: "#e0e0e0",
      margin: "0 auto 16px auto",
      objectFit: "cover",
      border: "3px solid white",
    },
    profileName: { fontWeight: "bold", fontSize: "1.1rem" },
    profileInfo: { fontSize: "0.9rem", color: "#555" },
    nav: { display: "flex", flexDirection: "column", gap: "8px" },
    navLink: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      textDecoration: "none",
      color: "#333",
      padding: "12px 16px",
      borderRadius: "8px",
      transition: "background-color 0.2s, color 0.2s",
      fontWeight: "500",
    },
    logoutButton: {
      background: "#ff4d4d",
      border: "none",
      color: "white",
      padding: "12px 16px",
      borderRadius: "8px",
      width: "100%",
      textAlign: "center",
      cursor: "pointer",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    content: {
      flex: 1,
      padding: isMobile ? "20px" : "40px",
      backgroundColor: "#ffffff",
      overflowY: "auto",
    },
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Pilih menu yang benar berdasarkan peran pengguna
  const menuItems =
    user?.role?.name === "counselor" ? counselorMenu : studentMenu;

  return (
    <div style={styles.layout(isMobile)}>
      <aside style={styles.sidebar(isMobile)}>
        <div>
          <div style={styles.profileSection}>
            {/* Tampilkan data dari AuthContext */}
            <img
              src={"https://via.placeholder.com/100"}
              alt="Profile"
              style={styles.avatar}
            />
            <div style={styles.profileName}>
              {user?.nama_lengkap || user?.username || "User"}
            </div>
            <div style={styles.profileInfo}>{user?.nim || user?.email}</div>
          </div>
          <nav style={styles.nav}>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive && activeLinkStyle),
                })}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </aside>
      <main style={styles.content}>{children}</main>
    </div>
  );
}

export default DashboardLayout;
