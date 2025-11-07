import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Function to store the user data in localStorage
export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.user.username,
      jwt: data.jwt,
    })
  );
};

// Function to retrieve user data from localStorage
export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || '""';
  try {
    const user = JSON.parse(stringifiedUser);
    return user || {};
  } catch (e) {
    return {};
  }
};

// Protector component to protect routes from unauthorized access
export const Protector = ({ Component }) => {
  const navigate = useNavigate();

  const { jwt } = userData();

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    }
  }, [navigate, jwt]);

  // Render protected component if the user is authenticated (has JWT), else return null
  return jwt ? Component : null;
};
