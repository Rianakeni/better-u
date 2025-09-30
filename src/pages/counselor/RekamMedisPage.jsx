import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RekamMedisForm from "./RekamMedisForm";

function RekamMedisPage() {
  const { jadwalId } = useParams();
  const { token } = useAuth();

  if (!jadwalId) return <p>Jadwal konsultasi tidak ditemukan.</p>;
  if (!token) return <p>Anda harus login sebagai konselor.</p>;

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "2rem 0 1rem" }}>
        Rekam Medis Konseling Form
      </h1>
      <RekamMedisForm jadwalId={jadwalId} token={token} />
    </div>
  );
}

export default RekamMedisPage;
