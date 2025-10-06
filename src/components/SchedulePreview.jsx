import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";
import id from "date-fns/locale/id";

const styles = {
  container: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1a202c",
  },
  viewAllButton: {
    color: "#3182ce",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  scheduleList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  scheduleItem: {
    padding: "1rem",
    backgroundColor: "#f7fafc",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
  },
  scheduleDate: {
    fontSize: "0.875rem",
    color: "#4a5568",
    marginBottom: "0.5rem",
  },
  scheduleInfo: {
    fontSize: "0.875rem",
    color: "#2d3748",
  },
  status: (status) => ({
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
    backgroundColor:
      status === "scheduled"
        ? "#E6FFE6"
        : status === "completed"
        ? "#E6E6FF"
        : status === "cancelled"
        ? "#FFE6E6"
        : "#E6FFE6",
    color:
      status === "scheduled"
        ? "#006600"
        : status === "completed"
        ? "#000066"
        : status === "cancelled"
        ? "#660000"
        : "#006600",
  }),
  noSchedule: {
    textAlign: "center",
    padding: "2rem",
    color: "#718096",
    fontSize: "0.875rem",
  },
};

function SchedulePreview() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    async function fetchSchedules() {
      try {
        // Mengambil 3 jadwal terdekat yang belum selesai
        const now = new Date().toISOString();
        const baseUrl =
          process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:1337";
        const params = new URLSearchParams({
          "filters[mahasiswa][id][$eq]": user.id,
          "filters[waktu_sesi][$gte]": now,
          sort: "waktu_sesi:asc",
          "pagination[limit]": "3",
          populate: "konselor,layanan_konseling",
        });

        const response = await fetch(
          `${baseUrl}/api/jadwal-availables?${params}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data jadwal");
        }

        const data = await response.json();
        setSchedules(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id && token) {
      fetchSchedules();
    }
  }, [user?.id, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Jadwal Konseling Anda</h2>
        <a href="/my-schedule" style={styles.viewAllButton}>
          Lihat Semua
        </a>
      </div>
      <div style={styles.scheduleList}>
        {schedules.length === 0 ? (
          <div style={styles.noSchedule}>
            Tidak ada jadwal konseling yang akan datang
          </div>
        ) : (
          schedules.map((schedule) => (
            <div key={schedule.id} style={styles.scheduleItem}>
              <div style={styles.scheduleDate}>
                {format(
                  new Date(schedule.attributes.waktu_sesi),
                  "EEEE, d MMMM yyyy",
                  { locale: id }
                )}
              </div>
              <div style={styles.scheduleInfo}>
                <div>
                  Waktu:{" "}
                  {format(new Date(schedule.attributes.waktu_sesi), "HH:mm")}
                </div>
                <div>
                  Konselor:{" "}
                  {schedule.attributes.konselor?.data?.attributes?.nama ||
                    "Belum ditentukan"}
                </div>
                <div>
                  Layanan:{" "}
                  {schedule.attributes.layanan_konseling?.data?.attributes
                    ?.nama_layanan || "-"}
                </div>
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                <span style={styles.status(schedule.attributes.status_jadwal)}>
                  {schedule.attributes.status_jadwal === "scheduled"
                    ? "Terjadwal"
                    : schedule.attributes.status_jadwal === "completed"
                    ? "Selesai"
                    : schedule.attributes.status_jadwal === "cancelled"
                    ? "Dibatalkan"
                    : "Terjadwal"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SchedulePreview;
