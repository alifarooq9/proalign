"use client";

import { DataTable } from "@/components/data-table";
import { dashboardColums } from "@/components/dasboard-columns";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";
import { urls } from "@/config/urls";
import { FolderPlusIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ProjectsTable() {
    const router = useRouter();

    const projects: Project[] = [];

    if (projects.length === 0) return <ProjectEmptyState />;

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

function ProjectEmptyState() {
    return (
        <div className="rounded-lg border-2 border-dashed bg-background py-16 text-center">
            <FolderPlusIcon className="mx-auto h-12 w-12" strokeWidth={1} />
            <h3 className="mt-2 text-sm font-semibold">No projects</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                Get started by creating a new project.
            </p>
            <div className="mt-6">
                <Button>
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    <span>Create Project</span>
                </Button>
            </div>
        </div>
    );
}
