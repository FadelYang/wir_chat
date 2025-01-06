import React from "react";
import DashboardTemplate from "../../components/templates/cms/DashboardTemplate";
import HeaderMenu from "../../components/organism/cms/HeaderMenu";
import LanguageTable from "../../components/organism/cms/datatables/languagesDatatable/LanguageTable";

const LanguageMenu = () => {
  const breadcrumbPath = [
    {name: "Dashboard", path: "/dashboard"},
    {name: "Languages", path: "/dashboard/languages"},
  ];

  return (
    <DashboardTemplate>
      <HeaderMenu name={`Languages`} breadcrumbPath={breadcrumbPath} />
      <div className="mt-14">
        <div className="flex justify-end">
          <button className="bg-[#0F172A] text-white py-2 px-4 text-sm rounded">
            Add new laguage
          </button>
        </div>
        <div className="mt-5">
          <LanguageTable />
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default LanguageMenu;
