import React from "react";
import BaseTable from "./BaseTable";

const LanguageTable = () => {
  const languageDummyData = [
    {
      id: "1",
      language: "Indonesia",
      selectedCollection: "db_indonesia_142_test",
      action: "dummy action",
    },
    {
      id: "2",
      language: "Japan",
      selectedCollection: "db_japan_142_test",
      action: "dummy action",
    },
    {
      id: "3",
      language: "China",
      selectedCollection: "db_china_142_test",
      action: "dummy action",
    },
    {
      id: "4",
      language: "English",
      selectedCollection: "db_english_142_test",
      action: "dummy action",
    },
  ];

  const languageTableDefinition = [
    {
      header: "id",
      accessorKey: "id",
    },
    {
      header: "Language",
      accessorKey: "language",
    },
    {
      header: "Selected Collection",
      accessorKey: "selectedCollection",
    },
    {
      header: "Action",
      accessorKey: "action",
    },
  ];

  return <BaseTable data={languageDummyData} columns={languageTableDefinition} />;
};

export default LanguageTable;
