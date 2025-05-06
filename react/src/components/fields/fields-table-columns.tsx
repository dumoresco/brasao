"use client";

import { format } from "date-fns";

import type { ColumnDef } from "@tanstack/react-table";

export type Campo = {
  id: string;
  name: string;
  datatype: string | number | boolean | Date;
  createdAt: Date;
};
export const camposTableColumns: ColumnDef<Campo>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      return (
        <span className="font-semibold flex items-center ">
          {row.getValue("name")}
        </span>
      );
    },
  },
  {
    accessorKey: "datatype",
    header: "Tipo de dado",
    cell: ({ row }) => {
      return <span className="font-semibold">{row.getValue("datatype")}</span>;
    },
  },

  {
    accessorKey: "createdAt",
    header: "Data de criação",
    cell: ({ row }) => {
      return (
        <span className="font-semibold">
          {format(row.getValue("createdAt"), "dd/MM/yyyy hh:mm")}
        </span>
      );
    },
  },
];
