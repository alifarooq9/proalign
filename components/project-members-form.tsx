"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { Button } from "./ui/button";

type ProjectMembersFormProps = {
    projectId: string;
    userId: string;
};

export default function ProjectMembersForm({
    projectId,
    userId,
}: ProjectMembersFormProps) {
    const getAllUsersAndOwnersQuery = useQuery(
        api.project.getProjectUsersAndOwners,
        {
            projectId,
        },
    );

    const users = getAllUsersAndOwnersQuery?.filter(
        (user) => user.role === "canEdit" || user.role === "canView",
    );

    return (
        <Card className="container w-full max-w-4xl px-0">
            <CardHeader>
                <CardTitle>Project Collaborators</CardTitle>
                <CardDescription>
                    Manage your project collaborators here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <h4 className="text-sm font-medium">People with access</h4>
                    <div className="grid gap-6">
                        {users === undefined && <div>loading...</div>}
                        {users &&
                            users.map((access) => (
                                <ProjectUsers
                                    key={access._id}
                                    user={{
                                        id: access.userId,
                                        firstName: access.user
                                            ?.firstName as string,
                                        lastName: access.user
                                            ?.lastName as string,
                                        email: access.user?.email as string[],
                                        imageUrl: access.user
                                            ?.imageUrl as string,
                                    }}
                                    role={access.role}
                                    projectAcccessId={access._id}
                                    ownerId={userId}
                                    projectId={projectId}
                                />
                            ))}
                        {users && users.length === 0 && (
                            <div className="text-muted-foreground">
                                No users with access.
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

type ProjectUsersProps = {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string[];
        imageUrl: string;
    };
    role: "canEdit" | "canView" | "owner";
    projectAcccessId: string;
    ownerId: string;
    projectId: string;
};

function ProjectUsers({
    user,
    role,
    projectAcccessId,
    ownerId,
    projectId,
}: ProjectUsersProps) {
    const updateProjectUserAccessMutation = useMutation(api.project.updateRole);

    const handleUpdateProjectUserAccess = async (role: string) => {
        return await new Promise<void>(async (resolve, reject) => {
            await updateProjectUserAccessMutation({
                accessId: projectAcccessId,
                role: role as "canEdit" | "canView" | "owner",
                projectId,
                userId: ownerId,
            })
                .then(() => resolve())
                .catch(() => reject());
        });
    };

    const handleOnChange = async (role: string) => {
        toast.promise(handleUpdateProjectUserAccess(role), {
            loading: "Updating Role...",
            success: "Role updated!",
            error: "Something went wrong!",
        });
    };

    return (
        <div className="flex w-full flex-col items-start justify-center space-x-0 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
            <div className="flex flex-1 items-center space-x-4">
                <Avatar>
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>
                        {user.firstName[0] + user.lastName[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium leading-none sm:max-w-none">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                        {user.email[0]}
                    </p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2 sm:flex-row-reverse">
                <Button variant="destructive">Remove</Button>
                <Select defaultValue={role} onValueChange={handleOnChange}>
                    <SelectTrigger className="ml-auto w-fit min-w-[110px]">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="canEdit">Can edit</SelectItem>
                        <SelectItem value="canView">Can view</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
