import {useState, useMemo} from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

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

const LanguageTable = () => {
  // const {columns, data} = props
  const [data, setData] = useState(languageDummyData);
  const languageTableDefinition = [
    {
      header: "id",
      accessorKey: "id",
    },
    {
      header: "Languange",
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
    {
      header: "Action",
      accessorKey: "action",
    },
    {
      header: "Action",
      accessorKey: "action",
    },
  ];
  const languageTableInstance = useReactTable({
    data,
    columns: languageTableDefinition,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex justify-center w-full p-5 overflow-x-auto">
        <div className="">
          <table className="min-w-full text-sm font-light text-left table-auto text-surface">
            <thead className="font-medium border-b border-neutral-200">
              {languageTableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      colSpan={header.colSpan}
                      key={header.id}
                      scope="col"
                      className="px-6 py-4"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {languageTableInstance.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-neutral-200">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="h-10 px-6 py-4 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LanguageTable;
