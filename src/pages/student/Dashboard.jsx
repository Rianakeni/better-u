import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import useWindowSize from "../../hooks/useWindowSize"; // Tambahkan ini

// Mock data
const mockSchedule = [
  {
    id: 1,
    date: "Rabu, 1 Oktober 2025",
    time: "10.10 - 11.30",
    counselor: "dr. konselor 1",
  },
  {
    id: 2,
    date: "Rabu, 1 Oktober 2025",
    time: "10.10 - 11.30",
    counselor: "dr. konselor 1",
  },
];

const mockHistory = [
  {
    id: 1,
    date: "Rabu, 1 Oktober 2025",
    time: "10.10 - 11.30",
    counselor: "dr. konselor 1",
  },
  {
    id: 2,
    date: "Rabu, 1 Oktober 2025",
    time: "10.10 - 11.30",
    counselor: "dr. konselor 1",
  },
];

function StudentDashboard() {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const firstName = user?.username?.split(" ")[0] || "Riana";

  const styles = {
    container: {
      fontFamily: "sans-serif",
      color: "#333",
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
      color: "#4a5568",
      maxWidth: "600px",
      lineHeight: "1.6",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "2rem",
      marginBottom: "2.5rem",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      border: "1px solid #e9ecef",
    },
    cardTitle: {
      fontWeight: "600",
      fontSize: "1.1rem",
      textTransform: "capitalize",
      color: "#495057",
      marginBottom: "1.5rem",
    },
    scheduleItem: {
      backgroundColor: "#d1fae5", // Warna hijau dari UI
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "0.875rem",
    },
    historyItem: {
      backgroundColor: "#f1f3f5", // Warna abu-abu dari UI
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "0.875rem",
    },
    itemDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    detailRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    downloadButton: {
      backgroundColor: "#3b82f6", // Warna biru dari UI
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "0.4rem 0.8rem",
      fontSize: "0.75rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    articleCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "2.5rem",
      border: "1px solid #e9ecef",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "2.5rem",
      alignItems: "center",
    },
    articleText: {
      flex: 1,
    },
    articleTitle: {
      fontSize: "2.25rem",
      fontWeight: "700",
      marginBottom: "1rem",
      lineHeight: "1.2",
    },
    articleDescription: {
      lineHeight: "1.6",
      marginBottom: "1.5rem",
      color: "#4a5568",
    },
    articleButton: {
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "0.75rem 1.5rem",
      cursor: "pointer",
      fontWeight: "600",
      textDecoration: "none",
    },
    articleImageContainer: {
      flex: 1,
      maxWidth: "320px",
      height: "200px",
      backgroundColor: "#e9ecef",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#adb5bd",
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Selamat Datang, {firstName}!</h1>
        <p style={styles.subtitle}>
          Kami ada di sini untuk menemani perjalananmu menjaga pikiran dan
          perasaan tetap sehat. Jangan ragu untuk berbagi cerita, menemukan
          solusi, dan mendapatkan dukungan yang kamu butuhkan. Ingat, kamu tidak
          sendirian.
        </p>
      </div>

      <div style={styles.grid}>
        {/* Your Schedule Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>your schedule</h3>
          {mockSchedule.map((item) => (
            <div key={item.id} style={styles.scheduleItem}>
              <div style={styles.itemDetails}>
                <div style={styles.detailRow}>
                  <Calendar size={16} />
                  <span>{item.date}</span>
                </div>
                <div style={styles.detailRow}>
                  <Clock size={16} />
                  <span>{item.time}</span>
                </div>
              </div>
              <div>{item.counselor}</div>
            </div>
          ))}
        </div>

        {/* Your History Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>your history</h3>
          {mockHistory.map((item) => (
            <div key={item.id} style={styles.historyItem}>
              <div style={styles.itemDetails}>
                <div style={styles.detailRow}>
                  <Calendar size={16} />
                  <span>{item.date}</span>
                </div>
                <div style={styles.detailRow}>
                  <Clock size={16} />
                  <span>{item.time}</span>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <button style={styles.downloadButton}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download rekam medis
                </button>
                <span>{item.counselor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Card */}
      <div style={styles.articleCard}>
        <div style={styles.articleText}>
          <h2 style={styles.articleTitle}>
            Menjaga Kesehatan Mental di Era Modern
          </h2>
          <p style={styles.articleDescription}>
            Kesehatan mental adalah salah satu aspek penting dalam kehidupan
            yang sering kali terlupakan. Di era modern yang penuh tekanan, mulai
            dari tuntutan akademik, pekerjaan, hingga media sosial,
          </p>
          <Link to="/article-detail" style={styles.articleButton}>
            Read more
          </Link>
        </div>
        <div style={styles.articleImageContainer}>
          <span>Gambar Artikel</span>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
