import React, { useState, useEffect } from "react";

const styles = {
  form: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    maxWidth: 500,
    margin: "2rem auto",
  },
  label: { display: "block", marginBottom: 8, fontWeight: 600 },
  input: {
    width: "100%",
    padding: "8px 12px",
    marginBottom: 16,
    border: "1px solid #cbd5e1",
    borderRadius: 4,
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    minHeight: 60,
    padding: "8px 12px",
    marginBottom: 16,
    border: "1px solid #cbd5e1",
    borderRadius: 4,
    fontSize: "1rem",
  },
  button: {
    background: "#3182ce",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "10px 24px",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: { color: "#e53e3e", marginBottom: 12 },
  success: { color: "#38a169", marginBottom: 12 },
};

function RekamMedisForm({ jadwalId, token, onSuccess }) {
  const [form, setForm] = useState({
    permasalahan: "",
    diagnosa: "",
    rekomendasi: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // MOCK: Data mahasiswa dan tanggal sesi, nanti ganti dengan fetch API jika backend siap
  const [mahasiswa, setMahasiswa] = useState({
    nama_lengkap: "Budi Santoso",
    NIM: "123456789",
  });
  const [tanggalSesi, setTanggalSesi] = useState("2025-10-01T09:00:00.000Z");

  // Untuk integrasi API, gunakan useEffect berikut:
  // useEffect(() => {
  //   async function fetchJadwal() {
  //     try {
  //       const res = await fetch(`http://localhost:1337/api/jadwal-availables/${jadwalId}?populate=mahasiswa`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       const data = await res.json();
  //       setMahasiswa(data.data?.attributes?.mahasiswa || { nama_lengkap: "-", NIM: "-" });
  //     } catch {}
  //   }
  //   fetchJadwal();
  // }, [jadwalId, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // useEffect(() => {
    //   async function fetchJadwal() {
    //     try {
    //       const res = await fetch(`http://localhost:1337/api/jadwal-availables/${jadwalId}?populate=mahasiswa`, {
    //         headers: { Authorization: `Bearer ${token}` },
    //       });
    //       const data = await res.json();
    //       setMahasiswa(data.data?.attributes?.mahasiswa || { nama_lengkap: "-", NIM: "-" });
    //       setTanggalSesi(data.data?.attributes?.waktu_sesi || "-");
    //     } catch {}
    //   }
    //   fetchJadwal();
    // }, [jadwalId, token]);
    try {
      const res = await fetch(
        `http://localhost:1337/api/jadwal-availables/${jadwalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: form }),
        }
      );
      if (!res.ok) throw new Error("Gagal menyimpan rekam medis.");
      setSuccess("Rekam medis berhasil disimpan.");
      if (onSuccess) onSuccess();
      <div>
        Tanggal Sesi:{" "}
        <span style={{ fontWeight: 600 }}>
          {tanggalSesi !== "-"
            ? new Date(tanggalSesi).toLocaleString("id-ID", {
                dateStyle: "full",
                timeStyle: "short",
              })
            : "-"}
        </span>
      </div>;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={{ marginTop: 4 }}>
        Nama: <span style={{ fontWeight: 600 }}>{mahasiswa.nama_lengkap}</span>
      </div>
      <div>
        NIM: <span style={{ fontWeight: 600 }}>{mahasiswa.NIM}</span>
      </div>
      <div
        style={{
          marginBottom: 20,
          background: "#f1f5f9",
          padding: 12,
          borderRadius: 6,
        }}
      ></div>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      <label style={styles.label} htmlFor="permasalahan">
        Permasalahan
      </label>
      <textarea
        style={styles.textarea}
        name="permasalahan"
        value={form.permasalahan}
        onChange={handleChange}
        required
      />
      <label style={styles.label} htmlFor="diagnosa">
        Diagnosa
      </label>
      <textarea
        style={styles.textarea}
        name="diagnosa"
        value={form.diagnosa}
        onChange={handleChange}
        required
      />
      <label style={styles.label} htmlFor="rekomendasi">
        Rekomendasi
      </label>
      <textarea
        style={styles.textarea}
        name="rekomendasi"
        value={form.rekomendasi}
        onChange={handleChange}
        required
      />
      <button style={styles.button} type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan Rekam Medis"}
      </button>
    </form>
  );
}

export default RekamMedisForm;
