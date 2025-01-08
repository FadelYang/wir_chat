import React from "react";
import DashboardTemplate from "../../components/templates/cms/DashboardTemplate";
import HeaderMenu from "../../components/organism/cms/HeaderMenu";
import CollectionTable from "../../components/organism/cms/datatables/CollectionTable";

const CollectionMenu = () => {
  const breadcrumbPath = [
    {name: "Dashboard", path: "/dashboard"},
    {name: "Collections", path: "/dashboard/collections"},
  ];

  return (
    <DashboardTemplate>
      <HeaderMenu name={`Collections`} breadcrumbPath={breadcrumbPath} />
      <div className="mt-14">
        <div className="flex justify-end">
          <button className="bg-[#0F172A] text-white py-2 px-4 text-sm rounded">
            Add new collections
          </button>
        </div>
        <div className="mt-5">
          <CollectionTable />
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default CollectionMenu;
