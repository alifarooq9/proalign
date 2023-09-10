"use client";

import { DataTable } from "@/components/data-table";
import { dashboardColums } from "@/components/dasboard-columns";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";
import { urls } from "@/config/urls";

export default function ProjectsTable() {
    const router = useRouter();

    const projects: Project[] = [
        {
            id: "123123123",
            name: "Project 1",
            description: "This is a description",
            status: "Cancelled",
            badge: "Badge",
            createdAt: new Date().toLocaleString(),
            expectedCompletionDate: new Date().toLocaleString(),
            priority: "High",
        },
        {
            id: "Thisisdaddad",
            name: "Project 2",
            description: "This is a description",
            status: "Cancelled",
            badge: "Badge",
            createdAt: new Date().toLocaleString(),
            expectedCompletionDate: new Date().toLocaleString(),
            priority: "High",
        },
    ];

    function onClickRow(projectID: string) {
        router.push(urls.app.project(projectID));
    }

    return (
        <DataTable
            data={projects}
            columns={dashboardColums}
            onClickRow={onClickRow}
        />
    );
}
