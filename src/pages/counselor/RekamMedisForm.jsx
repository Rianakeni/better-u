import { useState, useEffect } from "react";
import { FileDown, Plus, ClipboardList } from "lucide-react";
import { jsPDF } from "jspdf";
import { strapiAxios } from "../../lib/strapiClient";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const mockRecords = [
  {
    id: "1",
    studentName: "Budi Santoso",
    permasalahan: "Mengalami kecemasan berlebih dan sulit tidur.",
    diagnosa: "Gangguan Kecemasan Umum (GAD)",
    rekomendasi:
      "Sesi Terapi Kognitif Perilaku (CBT) dua kali seminggu, teknik relaksasi, perbaikan pola tidur.",
    tanggal: "2025-10-15",
  },
  {
    id: "2",
    studentName: "Citra Lestari",
    permasalahan:
      "Suasana hati rendah, kehilangan minat pada aktivitas, menarik diri dari pergaulan.",
    diagnosa: "Gangguan Depresi Mayor (MDD) - Sedang",
    rekomendasi:
      "Sesi terapi individu, pertimbangkan konsultasi obat dengan psikiater, dorong kegiatan sosial.",
    tanggal: "2025-10-20",
  },
];

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc", // Equivalent to bg-background or a light gray
    padding: "24px",
  },
  mainContent: {
    maxWidth: "1280px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  headerTitle: {
    fontSize: "2.25rem",
    fontWeight: "bold",
    color: "#1e40af", // A primary blue color
  },
  headerSubtitle: {
    color: "#64748b", // Muted foreground
  },
  section: {
    marginBottom: "32px",
  },
  sectionTitleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  sectionSubtitle: {
    fontSize: "0.875rem",
    color: "#64748b",
  },
  formInputContainer: {
    marginBottom: "24px",
  },
  formLabel: {
    display: "block",
    marginBottom: "8px",
  },
  recordsGrid: {
    display: "grid",
    gap: "16px",
  },
  recordCardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  recordDetail: {
    fontSize: "0.875rem",
  },
  recordDetailLabel: {
    fontWeight: "600",
    color: "#64748b",
  },
  recordDetailText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  emptyStateCard: {
    borderStyle: "dashed",
  },
  emptyStateContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 0",
    textAlign: "center",
  },
  emptyStateIcon: {
    width: "48px",
    height: "48px",
    color: "#64748b",
    marginBottom: "16px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(226, 232, 240, 0.2)",
  },
  cardHeader: {
    padding: "24px",
    borderBottom: "1px solid #e2e8f0",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: "0.875rem",
    color: "#64748b",
  },
  cardContent: {
    padding: "24px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 24px",
    borderRadius: "6px",
    border: "1px solid transparent",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  buttonPrimary: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    color: "#334155",
    border: "1px solid #cbd5e1",
  },
  buttonIcon: {
    marginRight: "8px",
    width: "16px",
    height: "16px",
  },
};

// Responsive styles using media queries would typically be handled
// by a CSS-in-JS library, but for a simple case, we can define them.
// This is a simplified example for grid columns.
const getResponsiveGridStyle = () => {
  const width = window.innerWidth;
  if (width >= 1024) {
    // lg
    return { ...styles.recordsGrid, gridTemplateColumns: "repeat(3, 1fr)" };
  }
  if (width >= 768) {
    // md
    return { ...styles.recordsGrid, gridTemplateColumns: "repeat(2, 1fr)" };
  }
  return styles.recordsGrid;
};

const RekamMedisForm = () => {
  const [records, setRecords] = useState(mockRecords);
  const [formData, setFormData] = useState({
    studentName: "",
    permasalahan: "",
    diagnosa: "",
    rekomendasi: "",
  });
  const { token } = useAuth();
  const [gridStyle, setGridStyle] = useState(getResponsiveGridStyle());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setGridStyle(getResponsiveGridStyle());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save new record
  const handleSaveRecord = async () => {
    // Validation
    if (
      !formData.studentName ||
      !formData.permasalahan ||
      !formData.diagnosa ||
      !formData.rekomendasi
    ) {
      alert("Informasi Kurang: Harap isi semua kolom sebelum menyimpan.");
      return;
    }

    const newRecord = {
      ...formData,
      tanggal: new Date().toISOString().split("T")[0],
    };

    // API Integration - POST new record
    try {
      const { data: savedRecord } = await strapiAxios.post(
        "/medical-records",
        { data: newRecord },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Strapi returns { data: { id: ..., attributes: {...} } }. `savedRecord` holds this object.
      const formattedRecord = {
        id: savedRecord.id,
        ...savedRecord.attributes,
      };

      setRecords((prevRecords) => [formattedRecord, ...prevRecords]);

      // Reset form
      setFormData({
        studentName: "",
        permasalahan: "",
        diagnosa: "",
        rekomendasi: "",
      });

      alert(
        "Rekam Medis Tersimpan: Rekam medis telah berhasil disimpan ke database."
      );
    } catch (error) {
      console.error("Error saving record:", error);
      alert("Error: Gagal menyimpan rekam medis. Silakan coba lagi.");
    }
  };

  const fetchRecords = async () => {
    try {
      // Use strapiAxios with a GET request to fetch records
      const { data: recordsData } = await strapiAxios.get("/medical-records", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Normalize the data from Strapi's { data: [{ id, attributes }] } format
      // and ensure it's always an array.
      const responseData = recordsData?.data;
      const formattedRecords = Array.isArray(responseData)
        ? responseData.map((record) => ({
            id: record.id,
            ...record.attributes,
          }))
        : [];
      setRecords(formattedRecords);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      if (err.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  // Generate and download PDF
  const handleDownloadPDF = (record) => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    doc.setFillColor(33, 150, 243);
    doc.rect(0, 0, pageWidth, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("REKAM MEDIS", pageWidth / 2, 22, { align: "center" });

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`ID Rekam Medis: ${record.id}`, margin, 50);
    doc.text(`Tanggal: ${record.tanggal}`, pageWidth - margin, 50, {
      align: "right",
    });

    let yPosition = 65;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("NAMA KLIEN", margin, yPosition);

    yPosition += 7;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(record.studentName, margin, yPosition);

    yPosition += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PERMASALAHAN", margin, yPosition);

    yPosition += 7;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const problemLines = doc.splitTextToSize(record.permasalahan, contentWidth);
    doc.text(problemLines, margin, yPosition);
    yPosition += problemLines.length * 6;

    yPosition += 5;
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DIAGNOSA", margin, yPosition);

    yPosition += 7;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const diagnosisLines = doc.splitTextToSize(record.diagnosa, contentWidth);
    doc.text(diagnosisLines, margin, yPosition);
    yPosition += diagnosisLines.length * 6;

    yPosition += 5;
    doc.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("REKOMENDASI", margin, yPosition);

    yPosition += 7;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const recommendationLines = doc.splitTextToSize(
      record.rekomendasi,
      contentWidth
    );
    doc.text(recommendationLines, margin, yPosition);

    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("REKAM MEDIS RAHASIA", pageWidth / 2, footerY, {
      align: "center",
    });
    doc.text(
      `Dibuat pada ${new Date().toLocaleDateString("id-ID")}`,
      pageWidth / 2,
      footerY + 5,
      { align: "center" }
    );

    doc.save(
      `rekam-medis-${record.studentName.replace(/\s+/g, "-")}-${record.id}.pdf`
    );

    alert(
      `PDF Terunduh: Rekam medis untuk ${record.studentName} telah diunduh.`
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Sistem Rekam Medis</h1>
          <p style={styles.headerSubtitle}>
            Manajemen rekam medis konseling profesional
          </p>
        </div>

        <div style={styles.section}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Plus className="w-5 h-5 text-primary" />
                <h2 style={styles.cardTitle}>Rekam Medis Klien Baru</h2>
              </div>
              <p style={styles.cardDescription}>
                Masukkan informasi klien dan detail konseling
              </p>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.formInputContainer}>
                <label htmlFor="studentName" style={styles.label}>
                  Nama Klien
                </label>
                <input
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap klien"
                  style={styles.input}
                />
              </div>

              <div style={styles.formInputContainer}>
                <label htmlFor="permasalahan" style={styles.label}>
                  Permasalahan
                </label>
                <textarea
                  id="permasalahan"
                  name="permasalahan"
                  value={formData.permasalahan}
                  onChange={handleInputChange}
                  placeholder="Jelaskan permasalahan atau keluhan utama klien"
                  rows={4}
                  style={styles.input}
                />
              </div>

              <div style={styles.formInputContainer}>
                <label htmlFor="diagnosa" style={styles.label}>
                  Diagnosa
                </label>
                <textarea
                  id="diagnosa"
                  name="diagnosa"
                  value={formData.diagnosa}
                  onChange={handleInputChange}
                  placeholder="Masukkan diagnosa atau penilaian klinis"
                  rows={3}
                  style={styles.input}
                />
              </div>

              <div style={styles.formInputContainer}>
                <label htmlFor="rekomendasi" style={styles.label}>
                  Rekomendasi
                </label>
                <textarea
                  id="rekomendasi"
                  name="rekomendasi"
                  value={formData.rekomendasi}
                  onChange={handleInputChange}
                  placeholder="Masukkan rekomendasi perawatan dan rencana tindak lanjut"
                  rows={4}
                  style={styles.input}
                />
              </div>

              <button
                onClick={handleSaveRecord}
                style={{
                  ...styles.button,
                  ...styles.buttonPrimary,
                  width: "100%",
                }}
              >
                <Plus style={styles.buttonIcon} />
                Simpan Rekam Medis
              </button>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitleContainer}>
            <ClipboardList className="w-5 h-5 text-primary" />
            <h2 style={styles.sectionTitle}>Rekam Medis Tersimpan</h2>
            <span style={styles.sectionSubtitle}>({records.length} total)</span>
          </div>

          <div style={gridStyle}>
            {records.map((record) => (
              <div key={record.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{record.studentName}</h3>
                  <p style={styles.cardDescription}>{record.tanggal}</p>
                </div>
                <div
                  style={{ ...styles.cardContent, ...styles.recordCardContent }}
                >
                  <div style={styles.recordDetail}>
                    <p style={styles.recordDetailLabel}>Permasalahan:</p>
                    <p style={styles.recordDetailText}>{record.permasalahan}</p>
                  </div>
                  <div style={styles.recordDetail}>
                    <p style={styles.recordDetailLabel}>Diagnosa:</p>
                    <p style={styles.recordDetailText}>{record.diagnosa}</p>
                  </div>
                  <button
                    onClick={() => handleDownloadPDF(record)}
                    style={{ ...styles.button, ...styles.buttonOutline }}
                  >
                    <FileDown style={styles.buttonIcon} />
                    Unduh PDF
                  </button>
                </div>
              </div>
            ))}
          </div>

          {records.length === 0 && (
            <div style={{ ...styles.card, ...styles.emptyStateCard }}>
              <div
                style={{ ...styles.cardContent, ...styles.emptyStateContent }}
              >
                <ClipboardList style={styles.emptyStateIcon} />
                <p style={styles.headerSubtitle}>
                  Belum ada rekam medis. Tambahkan rekam medis klien pertama
                  Anda di atas.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RekamMedisForm;
