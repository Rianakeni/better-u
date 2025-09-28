import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = searchParams.get("jwt");
    const userString = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      // eslint-disable-next-line no-unused-expressions
      error ||
        "Login gagal. Pastikan Anda menggunakan akun email @student.unklab.ac.id";
      navigate("/login", { replace: true });
      return;
    }

    if (jwt && userString) {
      localStorage.setItem("authToken", jwt);
      localStorage.setItem("userData", userString);
      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard", { replace: true });
    } else {
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
