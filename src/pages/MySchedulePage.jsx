import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import { Calendar, Clock, User } from "lucide-react";

function MySchedulePage() {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width < 768;

  // --- MOCK DATA ---
  const [schedules] = useState([
    {
      id: 1,
      date: "Rabu, 1 Oktober 2025",
      time: "10.10 - 11.30",
      counselor: "dr. konselor 1",
      status: "di jadwalkan",
    },
    {
      id: 2,
      date: "Rabu, 1 Oktober 2025",
      time: "10.10 - 11.30",
      counselor: "dr. konselor 1",
      status: "di batalkan",
    },
    // Anda bisa menambahkan data jadwal lainnya di sini
  ]);

  const handleReschedule = () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin mengubah jadwal? Jadwal lama Anda akan dibatalkan dan Anda akan diarahkan ke halaman booking."
      )
    ) {
      navigate("/booking");
    }
  };

  const styles = {
    pageContainer: {
      fontFamily: "sans-serif",
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "8px",
    },
    header: {
      marginBottom: "2.5rem",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#1a202c",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#6b7280",
      maxWidth: "600px",
    },
    scheduleGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "1.5rem",
    },
    scheduleCard: {
      backgroundColor: "#d1fae5",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      color: "#064e3b",
      minHeight: "120px",
    },
    detailRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.9rem",
    },
    statusBadge: {
      position: "absolute",
      top: "1.5rem",
      right: "1.5rem",
      padding: "0.25rem 0.75rem",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "600",
      color: "white",
      textTransform: "capitalize",
    },
    statusScheduled: {
      backgroundColor: "#f59e0b", // Kuning
    },
    statusCancelled: {
      backgroundColor: "#ef4444", // Merah
    },
    actionButton: {
      position: "absolute",
      bottom: "1.5rem",
      right: "1.5rem",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "0.5rem 1rem",
      fontSize: "0.8rem",
      fontWeight: "500",
      cursor: "pointer",
    },
    emptyState: {
      textAlign: "center",
      padding: "3rem 2rem",
      color: "#6b7280",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Jadwal Saya</h1>
        <p style={styles.subtitle}>
          Kelola dan pantau jadwal konselingmu dengan mudah di sini. Pastikan
          setiap sesi sesuai dengan kebutuhan dan waktu yang kamu inginkan.
        </p>
      </div>

      {schedules.length === 0 ? (
        <p style={styles.emptyState}>Anda belum memiliki jadwal konsultasi.</p>
      ) : (
        <div style={styles.scheduleGrid}>
          {schedules.map((item) => {
            const statusStyle =
              item.status === "di batalkan"
                ? styles.statusCancelled
                : styles.statusScheduled;

            return (
              <div key={item.id} style={styles.scheduleCard}>
                <span style={{ ...styles.statusBadge, ...statusStyle }}>
                  {item.status}
                </span>

                <div style={styles.detailRow}>
                  <Calendar size={16} />
                  <span>{item.date}</span>
                </div>
                <div style={styles.detailRow}>
                  <Clock size={16} />
                  <span>{item.time}</span>
                </div>
                <div style={{ ...styles.detailRow, marginTop: "0.5rem" }}>
                  <User size={16} />
                  <span>{item.counselor}</span>
                </div>

                <button style={styles.actionButton} onClick={handleReschedule}>
                  Ubah Jadwal
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MySchedulePage;
