"use client";

import { DataTable } from "@/components/data-table";
import { dashboardColums } from "@/components/dasboard-columns";
import { Project, ProjectPriority, ProjectStatus } from "@/types/project";
import { useRouter } from "next/navigation";
import { urls } from "@/config/urls";
import { FolderPlusIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { CreateProjectDrawerTrigger } from "./create-project-drawer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";

type ProjectTableProps = {
    userId: string;
};

export default function ProjectsTable({ userId }: ProjectTableProps) {
    const router = useRouter();

    const projects = useQuery(api.project.getAll, {
        userId,
    });

    if (!projects) return <ProjectTableLoading />;

    if (projects.length === 0) return <ProjectEmptyState />;

    function onClickRow(projectID: string) {
        router.push(urls.app.project(projectID));
    }

    const projectsData: Project[] = projects.map((project) => ({
        name: project.name,
        description: project.description,
        badge: project.badge,
        expectedCompletionDate: project.expectedCompletionDate,
        id: project._id,
        priority: project.priority as ProjectPriority,
        status: project.status as ProjectStatus,
        _creationTime: new Date().toLocaleString(),
        owners: project.owners,
    }));

    return (
        <DataTable
            data={projectsData}
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
                <CreateProjectDrawerTrigger asChild>
                    <Button>
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        <span>Create Project</span>
                    </Button>
                </CreateProjectDrawerTrigger>
            </div>
        </div>
    );
}

export function ProjectTableLoading() {
    return (
        <div className="flex flex-col space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
    );
}
