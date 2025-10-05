import React from "react";
import { useAuth } from "../contexts/AuthContext";
import useWindowSize from "../hooks/useWindowSize";

function ProfilePage() {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const styles = {
    pageContainer: {
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
      color: "#6b7280",
      maxWidth: "600px",
    },
    mainContent: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Berubah saat mobile
      gap: "3rem",
      alignItems: isMobile ? "center" : "flex-start",
    },
    photoSection: {
      textAlign: "center",
    },
    profileImage: {
      width: "200px",
      height: "200px",
      borderRadius: "12px",
      objectFit: "cover",
      marginBottom: "1rem",
      border: "1px solid #dee2e6",
    },
    editPhotoButton: {
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      cursor: "pointer",
    },
    formSection: {
      flex: 1,
      maxWidth: "500px",
    },
    formGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      color: "#495057",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #ced4da",
      borderRadius: "6px",
      fontSize: "1rem",
      backgroundColor: "#e9ecef", // Warna abu-abu untuk field yg tidak bisa diedit
      cursor: "not-allowed",
    },
  };

  const mockUserData = {
    nama: "Riana Keni",
    nim: "105055559999",
    telp: "08123456789",
    // Gunakan placeholder atau gambar dari internet
    photo:
      "https://i.pinimg.com/564x/de/0f/3d/de0f3d6c09268f0c2394a1b0a887a032.jpg",
  };

  const displayUser = {
    ...mockUserData,
    nama: user?.username || mockUserData.nama,
  };

  const handleEditPhotoClick = () => {
    // Fungsi sementara
    alert("Fitur 'Edit Photo' akan segera hadir!");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Profile</h1>
        <p style={styles.subtitle}>
          Kelola informasi pribadimu di halaman ini. Pastikan data selalu
          terbaru agar layanan konseling lebih sesuai dengan kebutuhanmu.
        </p>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.photoSection}>
          <img
            src={displayUser.photo}
            alt="Profile"
            style={styles.profileImage}
          />
          <button style={styles.editPhotoButton} onClick={handleEditPhotoClick}>
            Edit photo
          </button>
        </div>

        <div style={styles.formSection}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="nama">
              Nama
            </label>
            <input
              id="nama"
              type="text"
              style={styles.input}
              value={displayUser.nama}
              readOnly
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="nim">
              NIM
            </label>
            <input
              id="nim"
              type="text"
              style={styles.input}
              value={displayUser.nim}
              readOnly
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="telp">
              Nomor Telp
            </label>
            <input
              id="telp"
              type="text"
              style={styles.input}
              value={displayUser.telp}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
