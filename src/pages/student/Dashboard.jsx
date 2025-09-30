import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.125rem",
    color: "#6b7280",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  cardIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "0.75rem",
    fontSize: "1.25rem",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1f2937",
  },
  cardContent: {
    marginBottom: "1rem",
  },
  nextAppointment: {
    padding: "1rem",
    backgroundColor: "#f0f9ff",
    borderRadius: "0.5rem",
    border: "1px solid #bae6fd",
    marginBottom: "1rem",
  },
  appointmentDate: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#0369a1",
    marginBottom: "0.25rem",
  },
  appointmentDetails: {
    color: "#6b7280",
    fontSize: "0.875rem",
  },
  ctaButton: {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  noAppointment: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "1rem",
  },
  statsCard: {
    textAlign: "center",
  },
  statsNumber: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    display: "block",
  },
  statsLabel: {
    color: "#6b7280",
    fontSize: "0.875rem",
  },
  resourcesSection: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  resourcesTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  resourcesList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
  },
  resourceItem: {
    padding: "1rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.5rem",
    transition: "border-color 0.2s, transform 0.2s",
    cursor: "pointer",
  },
  resourceTitle: {
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  resourceDescription: {
    color: "#6b7280",
    fontSize: "0.875rem",
  },
};

// MOCK DATA, ganti dengan fetch dari API jika backend sudah siap
const mockConsultations = [
  {
    id: 1,
    date: "2025-10-01",
    time: "10:00",
    status: "scheduled",
    counselor: "Dr. John Doe",
  },
  {
    id: 2,
    date: "2025-09-20",
    time: "09:00",
    status: "completed",
    counselor: "Dr. John Doe",
  },
  {
    id: 3,
    date: "2025-09-10",
    time: "13:00",
    status: "completed",
    counselor: "Dr. Jane Smith",
  },
];

function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const nextAppointment = mockConsultations.find(
    (c) =>
      c.status === "scheduled" && new Date(c.date + " " + c.time) > new Date()
  );
  const completedSessions = mockConsultations.filter(
    (c) => c.status === "completed"
  ).length;
  const upcomingSessions = mockConsultations.filter(
    (c) => c.status === "scheduled"
  ).length;

  const resources = [
    {
      title: "Stress Management",
      description:
        "Learn effective techniques to manage academic and personal stress.",
    },
    {
      title: "Study Techniques",
      description: "Improve your learning methods and academic performance.",
    },
    {
      title: "Mental Health Tips",
      description: "Daily practices for maintaining good mental health.",
    },
    {
      title: "Career Guidance",
      description: "Resources to help you plan your future career path.",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          Selamat datang,{" "}
          {user?.nama_lengkap?.split(" ")[0] || user?.username || "Student"}!
        </h1>
        <p style={styles.subtitle}>
          Berikut ringkasan dashboard konseling Anda
        </p>
      </div>

      <div style={styles.grid}>
        {/* Next Appointment Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div
              style={{
                ...styles.cardIcon,
                backgroundColor: "#dbeafe",
                color: "#3b82f6",
              }}
            >
              📅
            </div>
            <h3 style={styles.cardTitle}>Jadwal Konseling Berikutnya</h3>
          </div>
          <div style={styles.cardContent}>
            {nextAppointment ? (
              <div style={styles.nextAppointment}>
                <div style={styles.appointmentDate}>
                  {new Date(nextAppointment.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div style={styles.appointmentDetails}>
                  {nextAppointment.time} • {nextAppointment.counselor}
                </div>
              </div>
            ) : (
              <p style={styles.noAppointment}>
                Belum ada jadwal konseling berikutnya
              </p>
            )}
            <button
              style={styles.ctaButton}
              onClick={() =>
                navigate(nextAppointment ? "/my-schedule" : "/booking")
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3b82f6";
              }}
            >
              {nextAppointment ? "Lihat Jadwal" : "Booking Konseling"}
            </button>
          </div>
        </div>

        {/* Session Stats */}
        <div style={{ ...styles.card, ...styles.statsCard }}>
          <div style={styles.cardHeader}>
            <div
              style={{
                ...styles.cardIcon,
                backgroundColor: "#dcfce7",
                color: "#16a34a",
              }}
            >
              📊
            </div>
            <h3 style={styles.cardTitle}>Statistik Sesi</h3>
          </div>
          <div style={styles.cardContent}>
            <span style={styles.statsNumber}>{completedSessions}</span>
            <span style={styles.statsLabel}>Sesi Selesai</span>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div style={{ ...styles.card, ...styles.statsCard }}>
          <div style={styles.cardHeader}>
            <div
              style={{
                ...styles.cardIcon,
                backgroundColor: "#fef3c7",
                color: "#d97706",
              }}
            >
              ⏰
            </div>
            <h3 style={styles.cardTitle}>Sesi Mendatang</h3>
          </div>
          <div style={styles.cardContent}>
            <span style={styles.statsNumber}>{upcomingSessions}</span>
            <span style={styles.statsLabel}>Sesi Terjadwal</span>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div style={styles.resourcesSection}>
        <h2 style={styles.resourcesTitle}>Resource Bermanfaat</h2>
        <div style={styles.resourcesList}>
          {resources.map((resource, index) => (
            <div
              key={index}
              style={styles.resourceItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h4 style={styles.resourceTitle}>{resource.title}</h4>
              <p style={styles.resourceDescription}>{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
