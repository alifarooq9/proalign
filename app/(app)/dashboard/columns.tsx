"use client";

import { Project } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import {
    DataTableColumnHeader,
    DataTableRowActions,
} from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const columns: ColumnDef<Project>[] = [
    {
        id: "id",
        accessorKey: "#",
        header: () => <div className="text-center">ID</div>,
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <div className="truncate">{row.original.name}</div>,
        enableHiding: false,
        enableSorting: false,
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => {
            const badge = row.original.badge;

            return (
                <div className="flex w-full space-x-2 ">
                    {badge && <Badge variant="outline">{badge}</Badge>}
                    <span className="w-full truncate font-medium">
                        {row.original.description}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center ">
                    <span>{row.original.status}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center ">
                    <span>{row.original.priority}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "expectedCompletionDate",
        accessorKey: "expectedCompletionDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Completion Date" />
        ),
        cell: ({ row }) => (
            <div className="truncate">
                {format(new Date(row.original.expectedCompletionDate), "PPP")}
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
