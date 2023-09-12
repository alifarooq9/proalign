"use client";

import AppHeader from "@/components/app-header";
import ProjectDetailForm from "@/components/project-details-form";
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
        <main className="container max-w-4xl space-y-6 px-0 py-6">
            {projectDetails === undefined && <div>loading...</div>}

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
