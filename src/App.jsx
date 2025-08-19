import { useState, useEffect } from "react";
import ServiceCard from "./components/ServiceCard.jsx";

const styles = {
  appContainer: {
    backgroundColor: "#f7fafc",
    minHeight: "100vh",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  contentWrapper: {
    maxWidth: "896px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "48px 16px",
  },
  pageTitle: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#2d3748",
    textAlign: "center",
    marginBottom: "40px",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "32px",
  },
  loadingText: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#4a5568",
  },
  errorText: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#e53e3e",
  },
};

function App() {
  const [layanans, setLayanans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:1337/api/layanan-konselings"
        );
        if (!response.ok)
          throw new Error(
            "Gagal mengambil data dari server. Pastikan Strapi berjalan."
          );

        const layananJson = await response.json(); // Dideklarasikan dengan 'layananJson'
        console.log("Data mentah dari Strapi:", layananJson);
        setLayanans(layananJson.data); // Digunakan dengan 'layananJson' juga. SUDAH BENAR.
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p style={styles.loadingText}>Memuat data layanan...</p>;
  if (error) return <p style={styles.errorText}>Error: {error.message}</p>;

  return (
    <main style={styles.appContainer}>
      <div style={styles.contentWrapper}>
        <h1 style={styles.pageTitle}>Layanan Konseling UNKLAB</h1>
        <div style={styles.servicesGrid}>
          {layanans.map((layanan) => (
            <ServiceCard
              key={layanan.id}
              nama={layanan.nama_layanan}
              deskripsi={layanan.deskripsi_layanan}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
