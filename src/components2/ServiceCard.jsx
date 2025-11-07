import React from "react";

// Mendefinisikan semua style sebagai objek JavaScript

// Komponen React yang menggunakan objek styles di atas
function ServiceCard({ nama, deskripsi }) {
  return (
    <div style={styles.cardContainer}>
      <h2 style={styles.cardTitle}>{nama}</h2>
      <p style={styles.cardDescription}>{deskripsi}</p>
    </div>
  );
}
const styles = {
  cardContainer: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a202c",
    marginBottom: "8px",
  },
  cardDescription: {
    color: "#4a5568",
    lineHeight: "1.6",
  },
};

export default ServiceCard;
