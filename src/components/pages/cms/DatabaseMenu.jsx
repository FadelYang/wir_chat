import React from "react";
import DashboardTemplate from "../../templates/cms/DashboardTemplate";
import HeaderMenu from "../../organism/cms/HeaderMenu";
import BaseTable from "../../organism/cms/datatables/BaseTable";

const DatabaseMenu = () => {
  const breadcrumbPath = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Databases", path: "/dashboard/databases" },
  ];

  const databaseTableDefinition = [
    {
      header: "id",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Database Name",
      accessorKey: "databaseName",
    },
  ];

  const databaseTableData = [
    {
      databaseName: "indonesia",
    },
    {
      databaseName: "japan",
    },
    {
      databaseName: "china",
    },
    {
      databaseName: "english",
    },
  ];

  return (
    <DashboardTemplate>
      <HeaderMenu name={`Databases`} breadcrumbPath={breadcrumbPath} />
      <div className="mt-14">
        <div className="flex justify-end">
          <button className="hidden https://chat.whatsapp.com/LBUGzaJVNuhCmzaMGRTQZA bg-[#0F172A] text-white py-2 px-4 text-sm rounded">
            Add new database
          </button>
          <div className='flex flex-col w-full'>
            <BaseTable
              columns={databaseTableDefinition}
              data={databaseTableData}
            ></BaseTable>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default DatabaseMenu;
