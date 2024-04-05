import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import SearchBox from "./search-box/search-box";

export interface SimpleTableProps<T> {
  data: T[];
  showFilter?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  border?: string;
}

export default function SimpleTable<T>({
  data,
  showFilter = true,
  backgroundColor = "#0A1B25",
  borderRadius = 15,
  border = "1px solid #242836",
}: SimpleTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper<T>();
  const generateColumns = (dataSample: any) => {
    return Object.keys(dataSample).map((dataField) =>
      columnHelper.accessor((row: any) => row[dataField], {
        header: dataField,
      })
    );
  };

  const autoColumns = data.length > 0 ? generateColumns(data[0]) : [];

  const table = useReactTable({
    columns: autoColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      globalFilter: globalFilter,
    },
    state: {
      globalFilter: globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        {showFilter && (
          <SearchBox
            filter={globalFilter}
            setFilter={setGlobalFilter}
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            border={border}
          />
        )}
      </div>
      <div
        style={{
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          border: border,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          textAlign: "center",
        }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        color: "gray",
                        fontWeight: "normal",
                        marginTop: 10,
                        paddingLeft: 40,
                        paddingRight: 40,
                        paddingBottom: 10,
                        fontSize: 14,
                        textAlign: "left",
                        borderBottom: "1px solid #242836",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: 10,
                      paddingLeft: 40,
                      paddingRight: 40,
                      borderBottom: "1px solid #242836",
                      textAlign: "left",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
