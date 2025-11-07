import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import SchedulePreview from "../../components2/SchedulePreview";

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

      <div
        style={{
          ...styles.grid,
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
        }}
      >
        {/* Schedule Preview Component */}
        <SchedulePreview />

        {/* Article Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Artikel Terbaru</h3>
          <div style={styles.articleText}>
            <h2 style={styles.articleTitle}>
              Menjaga Kesehatan Mental di Era Modern
            </h2>
            <p style={styles.articleDescription}>
              Kesehatan mental adalah salah satu aspek penting dalam kehidupan
              yang sering kali terlupakan. Mari pelajari cara menjaganya.
            </p>
            <Link to="/articles" style={styles.articleButton}>
              Baca Selengkapnya
            </Link>
          </div>
        </div>
      </div>

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
