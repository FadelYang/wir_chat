import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";

export const MeGuard = ({ children }) => {
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
};
