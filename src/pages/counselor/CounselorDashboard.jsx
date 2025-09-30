import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.125rem",
    color: "#6b7280",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  cardIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "0.75rem",
    fontSize: "1.25rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1f2937",
  },
  cardContent: {
    marginBottom: "1rem",
  },
  noData: {
    textAlign: "center",
    color: "#e53e3e",
    marginBottom: "1rem",
    fontWeight: 500,
  },
  statsCard: {
    textAlign: "center",
  },
  statsNumber: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    display: "block",
  },
  statsLabel: {
    color: "#6b7280",
    fontSize: "0.875rem",
  },
};

// MOCK DATA, ganti dengan fetch dari API jika backend sudah siap
const mockSchedules = [
  {
    id: 1,
    date: "2025-10-01",
    time: "10:00",
    status: "scheduled",
    student: "Student A",
  },
  {
    id: 2,
    date: "2025-09-20",
    time: "09:00",
    status: "completed",
    student: "Student B",
  },
  {
    id: 3,
    date: "2025-09-10",
    time: "13:00",
    status: "completed",
    student: "Student C",
  },
];

function CounselorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error] = useState(null); // error state placeholder for future API integration

  // Simulasi error jika fetch gagal, ganti dengan fetch API jika backend siap
  // const [schedules, setSchedules] = useState([]);
  // useEffect(() => {
  //   fetch(...)
  //     .then(...)
  //     .catch(() => setError("Gagal mengambil jadwal."));
  // }, []);

  const nextSession = mockSchedules.find(
    (c) =>
      c.status === "scheduled" && new Date(c.date + " " + c.time) > new Date()
  );
  const completedSessions = mockSchedules.filter(
    (c) => c.status === "completed"
  ).length;
  const upcomingSessions = mockSchedules.filter(
    (c) => c.status === "scheduled"
  ).length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          Selamat datang,{" "}
          {user?.nama_lengkap?.split(" ")[0] || user?.username || "Konselor"}!
        </h1>
        <p style={styles.subtitle}>Berikut ringkasan dashboard konselor Anda</p>
      </div>

      {error && <div style={styles.noData}>Error: {error}</div>}

      <div style={styles.grid}>
        {/* Next Session Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div
              style={{
                ...styles.cardIcon,
                backgroundColor: "#dbeafe",
                color: "#3b82f6",
              }}
            >
              📅
            </div>
            <h3 style={styles.cardTitle}>Sesi Berikutnya</h3>
          </div>
          <div style={styles.cardContent}>
            {nextSession ? (
              <div>
                <div
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "#0369a1",
                    marginBottom: 4,
                  }}
                >
                  {new Date(nextSession.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                  {nextSession.time} • {nextSession.student}
                </div>
              </div>
            ) : (
              <p style={styles.noData}>Belum ada sesi berikutnya</p>
            )}
            <button
              style={
                styles.ctaButton || {
                  width: "100%",
                  padding: "0.75rem 1rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }
              }
              onClick={() => navigate("/my-schedule")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3b82f6";
              }}
            >
              Lihat Jadwal
            </button>
          </div>
        </div>

        {/* Session Stats */}
        <div style={{ ...styles.card, ...styles.statsCard }}>
          <div style={styles.cardHeader}>
            <div
              style={{
                ...styles.cardIcon,
                backgroundColor: "#dcfce7",
                color: "#16a34a",
              }}
            >
              📊
            </div>
            <h3 style={styles.cardTitle}>Sesi Selesai</h3>
          </div>
          <div style={styles.cardContent}>
            <span style={styles.statsNumber}>{completedSessions}</span>
            <span style={styles.statsLabel}>Sesi Selesai</span>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div style={{ ...styles.card, ...styles.statsCard }}>
          <div style={styles.cardHeader}>
            <div
              style={{
                ...styles.cardIcon,
                backgroundColor: "#fef3c7",
                color: "#d97706",
              }}
            >
              ⏰
            </div>
            <h3 style={styles.cardTitle}>Sesi Mendatang</h3>
          </div>
          <div style={styles.cardContent}>
            <span style={styles.statsNumber}>{upcomingSessions}</span>
            <span style={styles.statsLabel}>Sesi Terjadwal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounselorDashboard;
