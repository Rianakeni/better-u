import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const styles = {
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: "2rem",
  },
  historyList: { display: "flex", flexDirection: "column", gap: "1rem" },
  historyCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    border: "1px solid #e2e8f0",
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
  statusCompleted: { backgroundColor: "#38a169" },
  statusCancelled: { backgroundColor: "#e53e3e" },
};

const getStatusStyle = (status) => {
  if (status === "selesai") return styles.statusCompleted;
  if (status === "dibatalkan") return styles.statusCancelled;
  return {};
};

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();

  // --- ASLI: Fetch dari API ---
  // useEffect(() => {
  //   if (!user || !token) {
  //     setIsLoading(false);
  //     return;
  //   }
  //   async function fetchHistory() {
  //     try {
  //       const apiUrl = `http://localhost:1337/api/jadwal-availables?filters[klien][id][$eq]=${user.id}&filters[status][$in][0]=selesai&filters[status][$in][1]=dibatalkan&sort=waktu_sesi:desc`;
  //       const response = await fetch(apiUrl, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       if (!response.ok) throw new Error("Gagal mengambil riwayat.");
  //       const result = await response.json();
  //       setHistory(result.data);
  //     } catch (err) {
  //       // alert(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchHistory();
  // }, [user, token]);

  // --- MOCK DATA: Untuk pengembangan frontend tanpa API ---
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setHistory([
        {
          id: 1,
          waktu_sesi: "2025-09-10T09:00:00.000Z",
          status: "selesai",
          rekam_medis: true, // Simulasi sudah ada rekam medis
        },
        {
          id: 2,
          waktu_sesi: "2025-08-20T13:00:00.000Z",
          status: "dibatalkan",
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("id-ID", { dateStyle: "full" }),
      time: date.toLocaleTimeString("id-ID", { timeStyle: "short" }),
    };
  };

  if (isLoading) return <p>Memuat riwayat...</p>;

  return (
    <div>
      <h1 style={styles.title}>Riwayat Arsip Konsultasi</h1>
      {history.length === 0 ? (
        <p>
          Anda belum memiliki riwayat konsultasi yang telah selesai atau
          dibatalkan.
        </p>
      ) : (
        <div style={styles.historyList}>
          {history.map((item) => {
            const { date, time } = formatDateTime(item.waktu_sesi);
            // Simulasi: jika sudah ada rekam medis, tampilkan tombol Edit, jika belum, Isi
            // Nanti bisa diganti dengan pengecekan field rekam medis dari API
            const rekamMedisSudahAda = !!item.rekam_medis; // mock, ganti sesuai data asli
            return (
              <div key={item.id} style={styles.historyCard}>
                <div style={styles.details}>
                  <p style={styles.date}>{date}</p>
                  <p style={styles.time}>Pukul: {time}</p>
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...getStatusStyle(item.status),
                    }}
                  >
                    {item.status}
                  </span>
                  {/* Tombol hanya untuk konselor dan status selesai, selalu tampil di bawah status */}
                  {user?.role?.name === "counselor" &&
                    item.status === "selesai" && (
                      <Link
                        to={`/counselor/rekam-medis/${item.id}`}
                        style={{
                          marginTop: 20,
                          display: "block",
                          background: rekamMedisSudahAda
                            ? "#3182ce"
                            : "#38a169",
                          color: "white",
                          padding: "12px 0",
                          borderRadius: 6,
                          textAlign: "center",
                          textDecoration: "none",
                          fontWeight: 600,
                          fontSize: "1rem",
                          letterSpacing: 0.5,
                        }}
                      >
                        {rekamMedisSudahAda
                          ? "Edit Rekam Medis"
                          : "Isi Rekam Medis"}
                      </Link>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
