"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon, Loader2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { urls } from "@/config/urls";

type ProjectRequestAccessFormProps = {
    projectId: string;
    projectName: string;
    projectDescription: string;
    userId: string;
};

export function ProjectRequestAccessForm({
    projectId,
    userId,
    projectDescription,
    projectName,
}: ProjectRequestAccessFormProps) {
    const requestAccessMutate = useMutation(api.project.request_access);
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = () => {
        setLoading(true);
        requestAccessMutate({
            projectId,
            userId,
        })
            .then((res) => {
                toast.success("Request has been sent", {
                    description:
                        "The project owner will review your request and grant you access if they see fit.",
                });
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Card className="w-full max-w-xl">
            <CardHeader>
                <CardTitle>Request Access</CardTitle>
                <CardDescription>
                    Send a request to the project owner to get access to the
                    project.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <h4 className="flex flex-col">
                    <Label className="text-muted-foreground">
                        Project Name:
                    </Label>
                    <span className="text-xl font-semibold">{projectName}</span>
                </h4>
                <p className="flex flex-col">
                    <Label className="text-muted-foreground">
                        Project Description:
                    </Label>
                    <span>{projectDescription}</span>
                </p>
            </CardContent>
            <CardFooter className="flex place-content-end gap-3 border-t-2 border-dashed bg-muted/30 p-5 sm:px-7">
                <Button disabled={loading} variant="secondary" asChild>
                    <Link href={urls.app.dashboard}>
                        <LayoutDashboardIcon className="mr-1.5 h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                </Button>
                <Button onClick={onSubmit} disabled={loading}>
                    {loading && (
                        <Loader2Icon className="mr-1.5 h-4 w-4 animate-spin" />
                    )}
                    <span>Send Request</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
