import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginGuard({ children }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const alertShown = useRef(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  return user ? children : null;
}
