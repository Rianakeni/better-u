import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { BookOpen, Mail, Lock } from "lucide-react";

const colors = {
  primary: "#3182ce",
  secondary: "#805ad5",
  gray: "#a0aec0",
  error: "#e53e3e",
  white: "#ffffff",
  black: "#1a202c",
};

const styles = {
  loginContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    padding: "1rem",
    fontFamily: "sans-serif",
  },
  loginCard: {
    background: colors.white,
    padding: "3rem",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginBottom: "2rem",
    color: colors.primary,
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: "700",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    color: colors.black,
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  inputGroup: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    color: colors.gray,
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: "#4a5568",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    paddingLeft: "3rem",
    borderRadius: "8px",
    border: `1px solid ${colors.gray}`,
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  buttonDisabled: {
    backgroundColor: "#a0aec0",
    cursor: "not-allowed",
  },
  errorMessage: {
    color: colors.error,
    fontSize: "0.875rem",
    marginTop: "0.5rem",
    textAlign: "center",
  },
  demoCredentials: {
    background: "#f7fafc",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    fontSize: "0.875rem",
    color: "#4a5568",
  },
  demoTitle: {
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#2d3748",
  },
  demoCred: {
    fontFamily: "monospace",
    background: "white",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    margin: "0.25rem 0",
  },
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function dummyLogin(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (email === "admin@gmail" && password === "admin") {
      return true;
    }
    return false;
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const success = await dummyLogin(email, password);
    if (!success) {
      setError("Email atau password salah");
    } else {
      // JIKA SUKSES, BERI TANDA PENGENAL
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
    setIsSubmitting(false);
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.logo}>
          <BookOpen size={32} />
          <span style={styles.logoText}>Layanan Konseling Unklab</span>
        </div>
        <h1 style={styles.title}>Welcome Back</h1>
        <div style={styles.demoCredentials}>
          <div style={styles.demoTitle}>Coba Gunakan:</div>
          <div style={styles.demoCred}>Email: john.doe@student.edu</div>
          <div style={styles.demoCred}>Password: password123</div>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <div style={styles.inputGroup}>
              <Mail style={styles.inputIcon} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={styles.input}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <div style={styles.inputGroup}>
              <Lock style={styles.inputIcon} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={styles.input}
              />
            </div>
          </div>
          {error && <div style={styles.errorMessage}>{error}</div>}
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isSubmitting && styles.buttonDisabled),
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
