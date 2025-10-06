import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { Calendar, Clock, User } from "lucide-react";
import { useMediaQuery } from "react-responsive";

function MySchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { token } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const filteredSchedules = schedules.filter((schedule) => {
    if (activeFilter === "all") return true;
    return schedule.status === activeFilter;
  });

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/slot-jadwals?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch schedules");
        }

        const data = await response.json();
        setSchedules(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [token]);

  // Temporary mock data, will be replaced by API data
  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Jadwal Saya</h1>
        </div>
        <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Jadwal Saya</h1>
        </div>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          Error: {error}
        </div>
      </div>
    );
  }

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
    statusCompleted: {
      backgroundColor: "#22c55e", // Hijau
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

      <div style={{ marginBottom: "2rem" }}>
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
            marginRight: "1rem",
          }}
        >
          <option value="all">Semua Jadwal</option>
          <option value="scheduled">Terjadwal</option>
          <option value="completed">Selesai</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
      </div>

      {filteredSchedules.length === 0 ? (
        <p style={styles.emptyState}>Anda belum memiliki jadwal konsultasi.</p>
      ) : (
        <div style={styles.scheduleGrid}>
          {filteredSchedules.map((schedule) => {
            const statusStyle =
              schedule.status === "cancelled"
                ? styles.statusCancelled
                : schedule.status === "completed"
                ? styles.statusCompleted
                : styles.statusScheduled;

            return (
              <div key={schedule.id} style={styles.scheduleCard}>
                <span style={{ ...styles.statusBadge, ...statusStyle }}>
                  {schedule.status === "scheduled" && "Terjadwal"}
                  {schedule.status === "completed" && "Selesai"}
                  {schedule.status === "cancelled" && "Dibatalkan"}
                </span>

                <div style={styles.detailRow}>
                  <Calendar size={16} />
                  <span>
                    {format(
                      new Date(schedule.attributes.date),
                      "EEEE, d MMMM yyyy",
                      { locale: id }
                    )}
                  </span>
                </div>
                <div style={styles.detailRow}>
                  <Clock size={16} />
                  <span>
                    {format(new Date(schedule.attributes.startTime), "HH:mm")} -{" "}
                    {format(new Date(schedule.attributes.endTime), "HH:mm")}
                  </span>
                </div>
                <div style={{ ...styles.detailRow, marginTop: "0.5rem" }}>
                  <User size={16} />
                  <span>
                    {schedule.attributes.konselor.data.attributes.name}
                  </span>
                </div>

                {schedule.status === "scheduled" && (
                  <button
                    style={styles.actionButton}
                    onClick={handleReschedule}
                  >
                    Ubah Jadwal
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MySchedulePage;
