import React from "react";
import DashboardTemplate from "../../templates/cms/DashboardTemplate";
import { useAuth } from "../../../context/AuthContext";

const Dashboard = () => {
  const { user, setUser, loading } = useAuth();

  return (
    <DashboardTemplate>
      <div>
        <h1 className="text-xl">Halo, {loading ? "..." : user.email}</h1>
      </div>
    </DashboardTemplate>
  );
};

export default Dashboard;
