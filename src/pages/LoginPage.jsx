import React from "react";
import { BookOpen } from "lucide-react"; // Ganti 'Google' menjadi 'BookOpen' atau logo Anda

const styles = {
  loginContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, #3182ce 0%, #805ad5 100%)`,
    padding: "1rem",
    fontFamily: "sans-serif",
  },
  loginCard: {
    background: "white",
    padding: "3rem 2rem",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "450px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
    color: "#3182ce",
  },
  logoText: { fontSize: "1.5rem", fontWeight: "700" },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "2rem",
    color: "#2d3748",
  },
  googleButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "white",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    textDecoration: "none",
    color: "#2d3748",
    transition: "background-color 0.2s",
  },
};

function LoginPage() {
  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.logo}>
          <BookOpen size={32} />
          <span style={styles.logoText}>Better-U</span>
        </div>
        <h1 style={styles.title}>Layanan Konseling Universitas Klabat</h1>
        <a
          href="http://localhost:1337/api/connect/google"
          style={styles.googleButton}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google icon"
            width="20"
            height="20"
          />
          <span>Sign in with UNKLAB Google Account</span>
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
