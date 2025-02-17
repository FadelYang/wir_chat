import {useState, useMemo} from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

const BaseTable = (props) => {
  const {data, columns} = props;
  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="w-full overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-white">
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      colSpan={header.colSpan}
                      key={header.id}
                      scope="col"
                      className="px-6 py-3 text-sm font-normal text-left text-gray-500 text-la whitespace-nowrap"
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
            <tbody className="bg-white divide-y divide-gray-200">
              {tableInstance.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
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
      <div className="flex gap-3 mt-2 text-[#3C50E0] text-sm">
        <div>
          <button
            onClick={() => {
              tableInstance.previousPage();
            }}
            disabled={!tableInstance.getCanPreviousPage()}
            className={
              !tableInstance.getCanPreviousPage() ? "text-gray-500" : ""
            }
          >
            Previous Page
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              tableInstance.nextPage();
            }}
            disabled={!tableInstance.getCanNextPage()}
            className={!tableInstance.getCanNextPage() ? "text-gray-500" : ""}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export default BaseTable;
