"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

type AssignUsersTaskProps = {
    projectId: string;
    taskId: string;
    taskUsers: {
        id: string;
        firstName: string;
        lastName: string;
        email: string[];
        imageUrl: string;
    }[];
};

export default function AssignUsersTask({
    projectId,
    taskId,
    taskUsers,
}: AssignUsersTaskProps) {
    const users = useQuery(api.project.getProjectUsersAndOwners, {
        projectId,
    });

    function isUserAlreadyAssigned(userId: string) {
        return taskUsers.some((user) => user.id === userId);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" size="sm" className="p-2 text-sm">
                    Assign users
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign users the task</DialogTitle>
                    <DialogDescription>
                        Assign users the task to work on it.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[500px]">
                    <div className="flex flex-col gap-3">
                        {users &&
                            users.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex w-full flex-col items-start justify-center space-x-0 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0"
                                >
                                    <div className="flex flex-row items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    user?.user
                                                        ?.imageUrl as string
                                                }
                                            />
                                            <AvatarFallback className="uppercase">
                                                {user?.user?.firstName?.charAt(
                                                    0,
                                                )}
                                                {user?.user?.lastName?.charAt(
                                                    0,
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="line-clamp-1 text-sm font-medium leading-none">
                                                {user?.user?.firstName}{" "}
                                                {user?.user?.lastName}
                                            </p>
                                            <p className="line-clamp-1 text-sm text-muted-foreground">
                                                {user?.user?.email &&
                                                    (user?.user
                                                        ?.email[0] as string)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full space-x-2 sm:w-auto">
                                        {isUserAlreadyAssigned(user.userId) ? (
                                            <RemoveUserTask
                                                projectId={projectId}
                                                taskId={taskId}
                                                assignUserId={
                                                    user.user?.clerkId as string
                                                }
                                            />
                                        ) : (
                                            <AssignTask
                                                projectId={projectId}
                                                taskId={taskId}
                                                assignUserId={
                                                    user.user?.clerkId as string
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

type AssignTaskProps = {
    projectId: string;
    taskId: string;
    assignUserId: string;
};

function AssignTask({ projectId, taskId, assignUserId }: AssignTaskProps) {
    const { userId } = useAuth();

    const assignTaskMutation = useMutation(api.task.assignTaskToUser);

    const [loading, setLoading] = useState<boolean>(false);

    async function handleAssign() {
        setLoading(true);
        await assignTaskMutation({
            projectId,
            taskId,
            userId: assignUserId,
            ownerId: userId as string,
        })
            .then(() => {
                toast.success("Task assigned successfully");
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Button disabled={loading} variant="secondary" onClick={handleAssign}>
            {loading && <Loader2Icon className="mr-1.5 h-4 w-4 animate-spin" />}
            <span>Assign</span>
        </Button>
    );
}

type RemoveUserTaskProps = {
    projectId: string;
    taskId: string;
    assignUserId: string;
};

function RemoveUserTask({
    projectId,
    taskId,
    assignUserId,
}: RemoveUserTaskProps) {
    const { userId } = useAuth();

    const removeTaskMutation = useMutation(api.task.removeUserFromTask);

    const [loading, setLoading] = useState<boolean>(false);

    async function handleRemove() {
        setLoading(true);
        await removeTaskMutation({
            projectId,
            taskId,
            userId: assignUserId,
            ownerId: userId as string,
        })
            .then(() => {
                toast.success("Task removed successfully");
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Button disabled={loading} variant="destructive" onClick={handleRemove}>
            {loading && <Loader2Icon className="mr-1.5 h-4 w-4 animate-spin" />}
            <span>Remove</span>
        </Button>
    );
}
