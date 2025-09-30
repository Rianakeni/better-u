import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const styles = {
  // ... (salin objek styles dari HistoryPage.jsx Anda sebelumnya)
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: "2rem",
  },
  scheduleList: { display: "flex", flexDirection: "column", gap: "1rem" },
  scheduleCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    border: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  date: { fontSize: "1.125rem", fontWeight: "600", color: "#2d3748" },
  time: { fontSize: "1rem", color: "#4a5568" },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "white",
    textTransform: "capitalize",
  },
  statusScheduled: { backgroundColor: "#3182ce" },
  actions: { display: "flex", gap: "0.5rem" },
  button: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e0",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontWeight: "500",
  },
};

function MySchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // --- ASLI: Fetch dari API ---
  // useEffect(() => {
  //   if (!user || !token) {
  //     setIsLoading(false);
  //     return;
  //   }
  //   async function fetchSchedules() {
  //     try {
  //       const apiUrl = `http://localhost:1337/api/jadwal-availables?filters[klien][id][$eq]=${user.id}&filters[status][$eq]=dijadwalkan&sort=waktu_sesi:asc&populate=slot_jadwal`;
  //       const response = await fetch(apiUrl, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       if (!response.ok) throw new Error("Gagal mengambil jadwal.");
  //       const result = await response.json();
  //       setSchedules(result.data);
  //     } catch (err) {
  //       // alert(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchSchedules();
  // }, [user, token]);

  // --- MOCK DATA: Untuk pengembangan frontend tanpa API ---
  useEffect(() => {
    setIsLoading(true);
    // Data dummy jadwal
    setTimeout(() => {
      setSchedules([
        {
          id: 1,
          waktu_sesi: "2025-10-02T09:00:00.000Z",
          status: "di jadwalkan",
          slot_jadwal: { id: 1 },
        },
        {
          id: 2,
          waktu_sesi: "2025-10-05T13:00:00.000Z",
          status: "di jadwalkan",
          slot_jadwal: { id: 2 },
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  // --- ASLI: Fungsi reschedule ke API ---
  // const handleReschedule = async (jadwalItem) => {
  //   if (!jadwalItem.slot_jadwal) {
  //     alert("Error: Data slot tidak ditemukan untuk jadwal ini.");
  //     return;
  //   }
  //   if (
  //     window.confirm(
  //       "Anda yakin ingin mengubah jadwal ini? Jadwal lama Anda akan dibatalkan."
  //     )
  //   ) {
  //     try {
  //       await fetch(
  //         `http://localhost:1337/api/jadwal-availables/${jadwalItem.id}`,
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ data: { status: "dibatalkan" } }),
  //         }
  //       );
  //       await fetch(
  //         `http://localhost:1337/api/slot-jadwals/${jadwalItem.slot_jadwal.id}`,
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ data: { status_slot: "tersedia" } }),
  //         }
  //       );
  //       alert(
  //         "Jadwal lama berhasil dibatalkan. Mengarahkan Anda untuk memilih jadwal baru..."
  //       );
  //       navigate("/booking");
  //     } catch (error) {
  //       alert("Gagal mengubah jadwal: " + error.message);
  //     }
  //   }
  // };

  // --- MOCK: Reschedule hanya redirect ---
  const handleReschedule = (jadwalItem) => {
    navigate("/booking");
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("id-ID", { dateStyle: "full" }),
      time: date.toLocaleTimeString("id-ID", { timeStyle: "short" }),
    };
  };

  if (isLoading) return <p>Memuat jadwal Anda...</p>;

  return (
    <div>
      <h1 style={styles.title}>Jadwal Saya</h1>
      {schedules.length === 0 ? (
        <p>Anda belum memiliki jadwal konsultasi yang akan datang.</p>
      ) : (
        <div style={styles.scheduleList}>
          {schedules.map((item) => {
            const { date, time } = formatDateTime(item.waktu_sesi);
            return (
              <div key={item.id} style={styles.scheduleCard}>
                <div style={styles.details}>
                  <p style={styles.date}>{date}</p>
                  <p style={styles.time}>Pukul: {time}</p>
                  <span
                    style={{ ...styles.statusBadge, ...styles.statusScheduled }}
                  >
                    {item.status}
                  </span>
                </div>
                <div style={styles.actions}>
                  <button
                    onClick={() => handleReschedule(item)}
                    style={styles.button}
                  >
                    Ubah Jadwal
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MySchedulePage;
