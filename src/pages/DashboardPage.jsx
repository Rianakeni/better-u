import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const styles = {
  welcomeHeader: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: "1rem",
  },
  welcomeSubtext: {
    fontSize: "1.125rem",
    color: "#4a5568",
    marginBottom: "2.5rem",
  },
  card: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "1rem",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  detailText: { fontSize: "1rem", color: "#4a5568" },
  button: {
    display: "inline-block",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3182ce",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    marginTop: "1rem",
  },
};

function DashboardPage() {
  const [upcomingAppointment, setUpcomingAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("Mahasiswa");

  // ======================= PERBAIKAN UTAMA DI SINI =======================
  useEffect(() => {
    // Ambil data user dari localStorage DI DALAM useEffect
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Set nama user untuk sapaan
    if (userData?.username) {
      setUserName(userData.username);
    }

    async function fetchUpcomingAppointment() {
      // Pastikan ada userData dan token sebelum fetch
      const authToken = localStorage.getItem("authToken");
      if (!userData || !authToken) {
        setIsLoading(false); // Berhenti loading jika tidak ada data user/token
        return;
      }

      const now = new Date().toISOString();
      const apiUrl =
        `http://localhost:1337/api/jadwal-konsultasis?` +
        `filters[klien][id][$eq]=${userData.id}` +
        `&filters[status][$eq]=dijadwalkan` +
        `&filters[waktu_sesi][$gte]=${now}` +
        `&sort=waktu_sesi:asc` +
        `&pagination[limit]=1`;

      try {
        const response = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!response.ok) throw new Error("Gagal mengambil jadwal.");

        const result = await response.json();
        if (result.data && result.data.length > 0) {
          setUpcomingAppointment(result.data[0]);
        }
      } catch (err) {
        setError(err);
      } finally {
        // Baris ini sekarang akan selalu berjalan setelah fetch selesai
        setIsLoading(false);
      }
    }

    fetchUpcomingAppointment();
  }, []); // <-- Dependency array dikosongkan agar hanya berjalan sekali

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("id-ID", { dateStyle: "full" }),
      time: date.toLocaleTimeString("id-ID", { timeStyle: "short" }),
    };
  };

  if (isLoading) return <p>Memuat dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div>
      <h1 style={styles.welcomeHeader}>Selamat Datang, {userName}!</h1>

      {upcomingAppointment ? (
        <div>
          <p style={styles.welcomeSubtext}>
            Anda memiliki jadwal konsultasi yang akan datang. Jangan lupa, ya!
          </p>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Jadwal Konsultasi Berikutnya</h2>
            <div style={styles.detailItem}>
              <span>🗓️</span>
              <span style={styles.detailText}>
                {formatDateTime(upcomingAppointment.waktu_sesi).date}
              </span>
            </div>
            <div style={styles.detailItem}>
              <span>🕒</span>
              <span style={styles.detailText}>
                Pukul {formatDateTime(upcomingAppointment.waktu_sesi).time}
              </span>
            </div>
            <Link to="/history" style={styles.button}>
              Lihat & Ubah Jadwal
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p style={styles.welcomeSubtext}>
            Anda belum memiliki jadwal konsultasi. Mari buat janji temu pertama
            Anda.
          </p>
          <Link to="/booking" style={styles.button}>
            Buat Janji Temu Sekarang
          </Link>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
