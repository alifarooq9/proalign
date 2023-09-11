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

        return await createProjectMutate({
            name: project.name,
            description: project.description,
            expectedCompletionDate: project.expectedCompletionDate,
            owners: [userId as string],
            priority: project.priority,
            status: project.status,
            users: [userId as string],
            badge: project.badge,
        })
            .then((res) => {
                toast.success("Project created successfully.");
                closeDrawer();
                return res;
            })
            .catch((err) => {
                toast.error("Something went wrong.");
                console.log(err);
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
