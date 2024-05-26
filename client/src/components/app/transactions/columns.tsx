/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { CircleAlertIcon, Layers2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import TooltipText from "../common/TooltipText";
import { formatHash } from "@/utils/formatHash";
import { formatTime } from "@/utils/formatTime";
import { Transaction } from "@/types/types";
import { STATUS_ICON_SIZE } from "./AllTransactionsTable";
import IconButton from "../common/IconButton";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: "Status",
    size: 64,
    cell: ({ row }) => {
      return (
        <div className="">
          {row.getValue("status") === "pending" ? (
            <CircleAlertIcon
              color="white"
              fill="red"
              height={STATUS_ICON_SIZE}
            />
          ) : (
            <Layers2Icon fill="white" color="teal" height={STATUS_ICON_SIZE} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "hash",
    header: "Hash",
    size: 200,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 items-center font-mono">
          <Link to={row.getValue("hash")}>
            <TooltipText tooltipText={row.getValue("hash")}>
              {formatHash(row.getValue("hash"))}
            </TooltipText>
          </Link>
          <IconButton clipboardValue={row.getValue("hash")}>
            <IconButton.Copy />
          </IconButton>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 120,
    cell: ({ row }) => {
      return (
        <Badge variant={row.getValue("type") as any} className="">
          {row.getValue("type")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "block",
    header: "Block",
    size: 100,
  },
  {
    accessorKey: "age",
    header: "Age",
    size: 100,
    cell: ({ row }) => {
      return formatTime(new Date(row.getValue("age")));
    },
  },
];
