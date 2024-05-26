/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback } from "react";

import { TableVirtuoso } from "react-virtuoso";
import { Socket } from "socket.io-client";
import { FILTERS } from "./FilterGroup";

export const STATUS_ICON_SIZE = 18;

interface AllTransactionsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  socket: Socket<any>;
  filter: FILTERS;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const AllTransactionsTable = <TData, TValue>({
  socket,
  columns,
  currentPage,
  setCurrentPage,
  data,
  filter,
}: AllTransactionsTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const loadMore = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
    socket.emit("transaction:nextRows", {
      currentPage: currentPage + 1,
      filter,
    });
  }, [currentPage, setCurrentPage, socket, filter]);

  return (
    <div>
      <div style={{ height: "0.5rem" }} />

      <TableVirtuoso
        style={{ height: "75vh", borderTop: "1px solid #7777" }}
        totalCount={rows.length}
        endReached={loadMore}
        components={{
          EmptyPlaceholder: () => {
            return <p>No results found.</p>;
          },
          Table: ({ style, ...props }) => {
            return (
              <table
                className="w-full table-fixed border-collapse border-spacing-0"
                {...props}
                style={{
                  ...style,
                }}
              />
            );
          },
          TableRow: (props) => {
            const index = props["data-index"];
            const row = rows[index];

            return (
              <tr {...props} className="border-b border-b-neutral-700">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          },
        }}
        fixedHeaderContent={() => {
          return table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="bg-neutral-900 text-left font-normal text-white/70 text-sm py-2 uppercase border-b border-b-neutral-700"
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          style: header.column.getCanSort()
                            ? { cursor: "pointer", userSelect: "none" }
                            : {},
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ));
        }}
      />
    </div>
  );
};

export default AllTransactionsTable;
