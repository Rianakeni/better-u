import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = searchParams.get("jwt");
    const userString = searchParams.get("user");

    if (jwt && userString) {
      // Simpan token, data user, dan status login
      localStorage.setItem("authToken", jwt);
      localStorage.setItem("userData", userString);
      localStorage.setItem("isLoggedIn", "true");

      // Arahkan ke dashboard setelah berhasil
      navigate("/", { replace: true });
    } else {
      // Jika gagal karena alasan apapun (misal, domain salah), kembali ke login
      alert(
        "Login gagal. Pastikan Anda menggunakan akun email @student.unklab.ac.id"
      );
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      Memproses otentikasi, harap tunggu...
    </div>
  );
}

export default AuthCallback;
