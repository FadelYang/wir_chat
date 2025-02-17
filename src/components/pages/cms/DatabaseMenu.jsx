import React from "react";
import DashboardTemplate from "../../templates/cms/DashboardTemplate";
import HeaderMenu from "../../organism/cms/HeaderMenu";

const DatabaseMenu = () => {
  const breadcrumbPath = [
    {name: "Dashboard", path: "/dashboard"},
    {name: "Databases", path: "/dashboard/databases"},
  ];

  return (
    <DashboardTemplate>
      <HeaderMenu name={`Databases`} breadcrumbPath={breadcrumbPath} />
      <div className="mt-14">
        <div className="flex justify-end">
          <button className="hidden https://chat.whatsapp.com/LBUGzaJVNuhCmzaMGRTQZA bg-[#0F172A] text-white py-2 px-4 text-sm rounded">
            Add new database
          </button>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default DatabaseMenu;
