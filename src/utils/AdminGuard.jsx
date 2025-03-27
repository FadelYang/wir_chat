import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminGuard = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const alertShown = useRef(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user && user.role !== "superadmin" && !alertShown.current) {
      // alert("You do not have permission to access this page");
      alertShown.current = true;
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  return user?.role === "superadmin" ? children : null;
};
