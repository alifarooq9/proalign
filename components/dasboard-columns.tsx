"use client";

import { Project } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const dashboardColums: ColumnDef<Project>[] = [
    {
        id: "id",
        accessorKey: "id",
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
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => {
            const badge = row.original.badge;

            return (
                <div className="flex w-full min-w-[250px] max-w-[400px] items-center space-x-2">
                    {badge && (
                        <Badge
                            variant="secondary"
                            className="whitespace-nowrap font-normal"
                        >
                            {badge}
                        </Badge>
                    )}
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
            <DataTableColumnHeader
                column={column}
                title="Status"
                align="center"
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center text-center">
                    {row.original.status}
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
            <DataTableColumnHeader
                column={column}
                title="Priority"
                align="center"
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    {row.original.priority}
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "creationDate",
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Creation"
                align="center"
            />
        ),
        cell: ({ row }) => (
            <div className="truncate text-center">
                {row.original._creationTime
                    ? format(new Date(row.original._creationTime), "PP")
                    : "-"}
            </div>
        ),
    },
    {
        id: "expectedCompletionDate",
        accessorKey: "expectedCompletionDate",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Completion"
                align="center"
            />
        ),
        cell: ({ row }) => (
            <div className="truncate text-center">
                {format(new Date(row.original.expectedCompletionDate), "PP")}
            </div>
        ),
    },
];
