/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { format } from "date-fns";

import { useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import type { Campo } from "../fields/fields-table-columns";

type Fill = {
  id: string;
  fieldId: string;
  value: string | number | boolean | Date;
  createdAt: Date;
};
export const fillTableColumns: ColumnDef<Fill>[] = [
  {
    accessorKey: "fieldId",
    header: "Campo",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const fieldsCache = queryClient.getQueryData<Campo[]>(["fields"]);

      const fieldId = row.getValue("fieldId");

      const { name, datatype } =
        fieldsCache?.find((field) => field.id === fieldId) || {};
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold flex items-center ">
            {(name as string) || (fieldId as string)}
          </span>
          •
          <span className="bg-muted w-fit px-2 py-1 rounded border">
            {datatype as string}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => {
      return (
        <span className="font-semibold">
          {row.getValue("value")!.toString()}
        </span>
      );
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
