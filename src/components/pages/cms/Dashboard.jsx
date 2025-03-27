import React from "react";
import DashboardTemplate from "../../templates/cms/DashboardTemplate";
import { useAuth } from "../../../context/AuthContext";
import HeaderMenu from '../../organism/cms/HeaderMenu';

const Dashboard = () => {
  const { user, setUser, loading } = useAuth();
  const breadcrumbPath = [
    {name: "Dashboard", path: "/dashboard"},
  ];

  return (
    <DashboardTemplate>
      <HeaderMenu name={`Dashboard`} breadcrumbPath={breadcrumbPath} />
      <div className='mt-14'>
        <h1 className="text-xl">Halo, {loading ? "..." : user.email}</h1>
      </div>
    </DashboardTemplate>
  );
};

export default Dashboard;
