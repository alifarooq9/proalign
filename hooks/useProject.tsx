"use client";

import { useDrawerStore } from "@/components/create-project-drawer";
import { api } from "@/convex/_generated/api";
import { Project } from "@/types/project";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

export function CreateProject() {
    const [loading, setLoading] = useState<boolean>(false);

    const { userId, isLoaded } = useAuth();

    const createProjectMutate = useMutation(api.project.create);

    const { closeDrawer } = useDrawerStore();

    async function mutate(project: Project) {
        if (!userId && isLoaded) {
            throw new Error("User not found.");
        }

        setLoading(true);

        const handleCreateProject = await createProjectMutate({
            name: project.name,
            description: project.description,
            expectedCompletionDate: project.expectedCompletionDate,
            owners: [userId as string],
            userId: userId as string,
            priority: project.priority,
            status: project.status,
            badge: project.badge,
        })
            .then((res) => {
                toast.success("Project created successfully.");
                closeDrawer();
                return res;
            })
            .catch((err) => {
                toast.error("Something went wrong.");
                throw new Error(err);
            })
            .finally(() => {
                setLoading(false);
            });

        return handleCreateProject;
    }

    return {
        mutate,
        loading,
    };
}

export function UpdateProject() {
    const [loading, setLoading] = useState<boolean>(false);

    const updateProjectMutate = useMutation(api.project.update);

    async function mutate(project: Project) {
        setLoading(true);

        return await updateProjectMutate({
            name: project.name,
            description: project.description,
            expectedCompletionDate: project.expectedCompletionDate,
            id: project.id as string,
            priority: project.priority,
            status: project.status,
            owners: [],
            badge: project.badge,
        })
            .then((res) => {
                toast.success("Project updated successfully.");
                return res;
            })
            .catch((err) => {
                console.log(err);

                toast.error("Something went wrong.");
                throw new Error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return {
        mutate,
        loading,
    };
}
