import React, { useState } from "react";
import useWindowSize from "../hooks/useWindowSize"; // Pastikan hook ini ada
import { Calendar, Clock, Download, User } from "lucide-react";

function HistoryPage() {
  const { width } = useWindowSize();
  const isMobile = width < 768;

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

  // --- MOCK DATA ---
  const [history] = useState([
    {
      id: 1,
      date: "Rabu, 1 Oktober 2025",
      time: "10.10 - 11.30",
      counselor: "dr. konselor 1",
      medicalRecord:
        "Ini adalah contoh rekam medis untuk sesi tanggal 1 Oktober 2025.\n\nPermasalahan: Mahasiswa merasa cemas menghadapi ujian akhir.\nDiagnosa: Gangguan kecemasan umum (ringan).\nRekomendasi: Latihan teknik relaksasi pernapasan dan manajemen waktu.",
    },
    {
      id: 2,
      date: "Rabu, 1 Oktober 2025",
      time: "10.10 - 11.30",
      counselor: "dr. konselor 1",
      medicalRecord:
        "Ini adalah contoh rekam medis kedua.\n\nPermasalahan: Kesulitan fokus saat belajar.",
    },
  ]);

  const handleDownload = (recordText, date) => {
    // Membuat file teks tiruan untuk diunduh
    const blob = new Blob([recordText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rekam-medis-${date
      .replace(/, /g, "-")
      .replace(/ /g, "-")}.txt`; // Membuat nama file dinamis
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    historyGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "1.5rem",
    },
    historyCard: {
      backgroundColor: "#f1f3f5", // Warna abu-abu dari UI
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    detailRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.9rem",
      color: "#495057",
    },
    cardFooter: {
      marginTop: "auto",
      paddingTop: "1rem",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    downloadButton: {
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "0.5rem 1rem",
      fontSize: "0.8rem",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
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
        <h1 style={styles.title}>Riwayat Konseling</h1>
        <p style={styles.subtitle}>
          Halaman ini menampilkan riwayat sesi konselingmu. Gunakan informasi
          ini untuk melihat kembali jadwal, topik, dan catatan dari setiap
          pertemuan.
        </p>
      </div>

      {history.length === 0 ? (
        <p style={styles.emptyState}>Anda belum memiliki riwayat konsultasi.</p>
      ) : (
        <div style={styles.historyGrid}>
          {history.map((item) => (
            <div key={item.id} style={styles.historyCard}>
              <div style={styles.detailRow}>
                <Calendar size={16} />
                <span>{item.date}</span>
              </div>
              <div style={styles.detailRow}>
                <Clock size={16} />
                <span>{item.time}</span>
              </div>
              <div style={styles.detailRow}>
                <User size={16} />
                <span>{item.counselor}</span>
              </div>
              <div style={styles.cardFooter}>
                <button
                  style={styles.downloadButton}
                  onClick={() => handleDownload(item.medicalRecord, item.date)}
                >
                  <Download size={14} />
                  Download rekam medis
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
