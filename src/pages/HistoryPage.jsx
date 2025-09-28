import React, { useState, useEffect } from "react";

const styles = {
  // ... (Anda bisa salin objek styles dari MySchedulePage.jsx, karena tampilannya mirip)
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
  statusCompleted: { backgroundColor: "#38a169" }, // Hijau
  statusCancelled: { backgroundColor: "#e53e3e" }, // Merah
};

const getStatusStyle = (status) => {
  if (status === "selesai") return styles.statusCompleted;
  if (status === "dibatalkan") return styles.statusCancelled;
  return {};
};

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const mockUser = { id: 1 };

  useEffect(() => {
    async function fetchHistory() {
      try {
        // Filter HANYA untuk jadwal yang sudah lewat
        const apiUrl = `http://localhost:1337/api/jadwal-availables?filters[klien][id][$eq]=${mockUser.id}&filters[status][$in][0]=selesai&filters[status][$in][1]=dibatalkan&sort=waktu_sesi:desc`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Gagal mengambil riwayat.");
        const result = await response.json();
        setHistory(result.data);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
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
                </div>
                {/* TIDAK ADA TOMBOL AKSI DI SINI */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
