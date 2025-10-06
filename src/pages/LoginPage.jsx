import React from "react";
import { BookOpen } from "lucide-react";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Ganti 'Google' menjadi 'BookOpen' atau logo Anda

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
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     console.log("Attempting login with:", { identifier, password });
  //     const res = await fetch("http://127.0.0.1:1337/api/auth/local", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ identifier, password }),
  //     });
  //     const data = await res.json();
  //     console.log("Login response:", data);

  //     if (!res.ok) {
  //       console.error("Login failed:", data);
  //       throw new Error(data.error?.message || "Login gagal");
  //     }

  //     // Periksa email dan role
  //     const email = data.user.email;

  //     // Ambil user dengan role menggunakan endpoint me
  //     const meRes = await fetch(
  //       "http://127.0.0.1:1337/api/users/me?populate=role",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${data.jwt}`,
  //         },
  //       }
  //     );
  //     const meData = await meRes.json();
  //     console.log("User data with role:", meData);

  //     const role = meData.role?.name?.toLowerCase();

  //     console.log("Login successful!");
  //     console.log("User Email:", email);
  //     console.log("User Role:", role);
  //     console.log("Full User Data:", JSON.stringify(data.user, null, 2));

  //     // Jika user belum punya role
  //     if (!role) {
  //       console.error("User tidak memiliki role!");
  //       throw new Error(
  //         "Akun Anda belum memiliki role yang sesuai. Silakan hubungi administrator."
  //       );
  //     }

  //     if (email === "counselor@unklab.ac.id" && role === "counselor") {
  //       console.log("Logging in as counselor...");
  //       login(data.user, data.jwt);
  //       navigate("/counselor/dashboard");
  //     } else if (
  //       email === "student1@student.unklab.ac.id" &&
  //       role === "student"
  //     ) {
  //       console.log("Logging in as student...");
  //       login(data.user, data.jwt);
  //       navigate("/student/dashboard");
  //     } else {
  //       console.error("Role mismatch:", {
  //         email: email,
  //         role: role,
  //         userData: data.user,
  //       });
  //       throw new Error(
  //         `Role tidak sesuai dengan email. Role Anda: ${role || "tidak ada"}`
  //       );
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Attempting login with:", { identifier, password });
      // Login request
      const res = await fetch("http://127.0.0.1:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        console.error("Login failed:", data);
        throw new Error(data.error?.message || "Login gagal");
      }

      // Ambil data user lengkap dengan role
      const meRes = await fetch(
        "http://127.0.0.1:1337/api/users/me?populate=role",
        {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        }
      );
      const meData = await meRes.json();
      console.log("User data with role:", meData);

      const email = data.user.email;
      const role = meData.role?.name?.toLowerCase();

      // Update user data dengan role
      const updatedUserData = { ...data.user, role: meData.role };

      if (email === "counselor@unklab.ac.id" && role === "counselor") {
        console.log("Logging in as counselor...");
        login(updatedUserData, data.jwt);
        navigate("/counselor/dashboard");
      } else if (
        email === "student1@student.unklab.ac.id" &&
        role === "student"
      ) {
        console.log("Logging in as student...");
        login(updatedUserData, data.jwt);
        navigate("/student/dashboard");
      } else {
        console.error("Role mismatch:", {
          email: email,
          role: role,
          userData: meData,
        });
        throw new Error(
          `Role tidak sesuai. Email: ${email}, Role: ${role || "tidak ada"}`
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.logo}>
          <BookOpen size={32} />
          <span style={styles.logoText}>Better-U</span>
        </div>
        <h1 style={styles.title}>Layanan Konseling Universitas Klabat</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Email atau Username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
              required
            />
          </div>
          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}
          <button type="submit" style={styles.googleButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
