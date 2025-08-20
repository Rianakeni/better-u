import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User, Check } from "lucide-react";

// Objek warna yang kita definisikan agar konsisten
const colors = {
  primary: { 300: "#90cdf4", 500: "#3182ce" },
  gray: {
    200: "#e2e8f0",
    500: "#a0aec0",
    600: "#718096",
    700: "#4a5568",
    900: "#1a202c",
  },
  white: "#ffffff",
  primaryBg: "#ebf8ff",
};

// Semua style dari styled-components diterjemahkan ke sini
const styles = {
  pageHeader: { textAlign: "center", marginBottom: "3rem" },
  pageTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: colors.gray[900],
    marginBottom: "0.5rem",
  },
  pageSubtitle: { color: colors.gray[600], fontSize: "1.125rem" },
  slotsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  slotCard: {
    backgroundColor: colors.white,
    padding: "24px",
    borderRadius: "8px",
    border: `2px solid transparent`,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  slotCardHover: {
    // Style untuk hover (simulasi)
    transform: "translateY(-2px)",
    borderColor: colors.primary[300],
  },
  slotCardSelected: {
    // Style untuk kartu yang dipilih
    borderColor: colors.primary[500],
    backgroundColor: colors.primaryBg,
  },
  slotHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  serviceType: {
    fontWeight: "600",
    color: colors.gray[900],
    fontSize: "1.125rem",
  },
  selectedIcon: { color: colors.primary[500] },
  slotDetails: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  slotDetail: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: colors.gray[600],
  },
  slotDetailIcon: { width: "16px", height: "16px", color: colors.gray[500] },
  slotDetailText: { fontSize: "0.875rem" },
  bookingForm: {
    marginTop: "2rem",
    backgroundColor: colors.white,
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  formTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: colors.gray[900],
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "500",
    color: "#4a5568",
  },
  textArea: {
    width: "100%",
    padding: "0.75rem",
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: "8px",
    fontSize: "1rem",
    fontFamily: "inherit",
    resize: "vertical",
    minHeight: "100px",
  },
  button: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  },
  confirmButton: { backgroundColor: colors.primary[500], color: colors.white },
  cancelButton: {
    backgroundColor: "transparent",
    color: colors.gray[700],
    border: `1px solid ${colors.gray[200]}`,
  },
  buttonDisabled: { backgroundColor: colors.gray[500], cursor: "not-allowed" },
  emptyState: {
    textAlign: "center",
    padding: "3rem 2rem",
    color: colors.gray[500],
  },
};

function BookingPage() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [hoveredSlotId, setHoveredSlotId] = useState(null); // State untuk simulasi hover
  const navigate = useNavigate();

  // Mengambil data user dari localStorage, menggantikan useAuth
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    async function loadAvailableSlots() {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:1337/api/slot-jadwals?filters[status][$eq]=tersedia"
        );
        if (!response.ok) throw new Error("Gagal memuat slot.");
        const result = await response.json();
        setAvailableSlots(result.data);
      } catch (error) {
        console.error("Gagal memuat slot:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAvailableSlots();
  }, []);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(selectedSlot?.id === slot.id ? null : slot);
  };

  const handleBooking = async () => {
    if (!selectedSlot || !userData || isBooking) return;

    try {
      setIsBooking(true);
      const authToken = localStorage.getItem("authToken");

      // 1. Buat entri Jadwal Konsultasi baru
      const bookingRes = await fetch(
        "http://localhost:1337/api/jadwal-availabels",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Kita akan gunakan ini saat login sudah asli
          },
          body: JSON.stringify({
            data: {
              waktu_sesi: selectedSlot.attributes.waktu_mulai,
              status: "dijadwalkan",
              klien: userData.id,
              slot_jadwal: selectedSlot.id,
              catatan_klien: notes,
            },
          }),
        }
      );

      if (!bookingRes.ok) throw new Error("Gagal membuat janji temu.");

      // 2. Update status Slot Jadwal menjadi 'dipesan'
      const slotUpdateRes = await fetch(
        `http://localhost:1337/api/slot-jadwals/${selectedSlot.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            data: {
              status: "dipesan",
            },
          }),
        }
      );

      if (!slotUpdateRes.ok) throw new Error("Gagal memperbarui status slot.");

      // 3. Jika semua berhasil, kembali ke dashboard
      alert("Booking berhasil!");
      navigate("/");
    } catch (error) {
      console.error("Gagal melakukan booking:", error);
      alert("Terjadi kesalahan saat booking. Silakan coba lagi.");
    } finally {
      setIsBooking(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("id-ID", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }),
    };
  };

  if (isLoading) {
    return <div>Memuat jadwal tersedia...</div>;
  }

  return (
    <div>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Buat Janji Temu Baru</h1>
        <p style={styles.pageSubtitle}>
          Pilih dari slot waktu yang tersedia di bawah ini
        </p>
      </div>

      {availableSlots.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>Tidak Ada Slot Tersedia</h3>
          <p>
            Saat ini tidak ada jadwal yang tersedia. Silakan cek kembali nanti.
          </p>
        </div>
      ) : (
        <>
          <div style={styles.slotsGrid}>
            {availableSlots.map((slot) => {
              const { date, time } = formatDateTime(
                slot.attributes.waktu_mulai
              );
              const isSelected = selectedSlot?.id === slot.id;
              const isHovered = hoveredSlotId === slot.id;

              const cardStyle = {
                ...styles.slotCard,
                ...(isHovered && styles.slotCardHover),
                ...(isSelected && styles.slotCardSelected),
              };

              return (
                <div
                  key={slot.id}
                  style={cardStyle}
                  onClick={() => handleSlotSelect(slot)}
                  onMouseEnter={() => setHoveredSlotId(slot.id)}
                  onMouseLeave={() => setHoveredSlotId(null)}
                >
                  <div style={styles.slotHeader}>
                    {/* Nanti kita bisa tambahkan jenis layanan di sini jika ada relasinya */}
                    <div style={styles.serviceType}>Konsultasi Umum</div>
                    {isSelected && <Check style={styles.selectedIcon} />}
                  </div>

                  <div style={styles.slotDetails}>
                    <div style={styles.slotDetail}>
                      <Calendar style={styles.slotDetailIcon} />
                      <span style={styles.slotDetailText}>{date}</span>
                    </div>
                    <div style={styles.slotDetail}>
                      <Clock style={styles.slotDetailIcon} />
                      <span style={styles.slotDetailText}>{time}</span>
                    </div>
                    {/* Nanti kita bisa tambahkan nama konselor di sini */}
                    <div style={styles.slotDetail}>
                      <User style={styles.slotDetailIcon} />
                      <span style={styles.slotDetailText}>Konselor UNKLAB</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedSlot && (
            <div style={styles.bookingForm}>
              <h3 style={styles.formTitle}>Detail Janji Temu</h3>
              <div>
                <label htmlFor="notes" style={styles.label}>
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Silakan bagikan topik spesifik yang ingin Anda diskusikan..."
                  style={styles.textArea}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginTop: "1.5rem",
                }}
              >
                <button
                  style={{
                    ...styles.button,
                    ...styles.confirmButton,
                    ...(isBooking && styles.buttonDisabled),
                  }}
                  onClick={handleBooking}
                  disabled={isBooking}
                >
                  {isBooking ? "Memproses..." : "Konfirmasi Booking"}
                </button>
                <button
                  style={{ ...styles.button, ...styles.cancelButton }}
                  onClick={() => setSelectedSlot(null)}
                >
                  Batal Pilih
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BookingPage;
