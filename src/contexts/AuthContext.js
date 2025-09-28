import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek localStorage saat pertama kali load
    const userString = localStorage.getItem("userData");
    const authToken = localStorage.getItem("authToken");
    if (userString && authToken) {
      try {
        setUser(JSON.parse(userString));
        setToken(authToken);
      } catch {
        setUser(null);
        setToken(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("authToken", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
