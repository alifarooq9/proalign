"use client";

import ProjectDetailForm from "@/components/project-details-form";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

type ProjectDetailsProps = {
    params: {
        id: string;
    };
};

export default function ProjectDetailsPage({ params }: ProjectDetailsProps) {
    const projectDetails = useQuery(api.project.getById, {
        id: params.id,
    });

    return (
        <main className="container flex max-w-4xl items-center justify-center space-y-6 px-0 py-6">
            {projectDetails === undefined && <ProjectDetailsPageloading />}

            {projectDetails && (
                <ProjectDetailForm
                    project={{
                        name: projectDetails.name,
                        description: projectDetails.description,
                        expectedCompletionDate:
                            projectDetails.expectedCompletionDate,
                        id: projectDetails._id,
                        priority: projectDetails.priority,
                        status: projectDetails.status,
                        _creationTime:
                            projectDetails._creationTime.toLocaleString(),
                        owners: projectDetails.owners,
                        badge: projectDetails.badge,
                    }}
                />
            )}
        </main>
    );
}

export function ProjectDetailsPageloading() {
    return (
        <div className="container flex max-w-4xl items-center justify-center space-y-6 px-0 py-6">
            <Skeleton className="h-96 w-full" />
        </div>
    );
}
