"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useState } from "react";
import { CheckIcon } from "lucide-react";
import { generateProjectShareLink } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { UserAccessLoading } from "@/components/user-access-skeleton";

type ProjectAccessFormProps = {
    projectId: string;
};

export default function ProjectAccessForm({
    projectId,
}: ProjectAccessFormProps) {
    const [copyText, setCopyText] = useState<"Copy Link" | "Copied">(
        "Copy Link",
    );

    const shareUrl = generateProjectShareLink(projectId);

    function copyLink() {
        clearTimeout(
            setTimeout(() => {
                setCopyText("Copy Link");
            }, 2000),
        );

        navigator.clipboard.writeText(shareUrl);
        setCopyText("Copied");

        setTimeout(() => {
            setCopyText("Copy Link");
        }, 2000);
    }

    const getRequestQuery = useQuery(api.project.getRequests, {
        projectId,
    });

    return (
        <Card className="container w-full max-w-4xl px-0">
            <CardHeader>
                <CardTitle>Project Access</CardTitle>
                <CardDescription>
                    Manage your project access here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h4 className="text-lg font-semibold">Share this document</h4>
                <CardDescription>
                    share this document with anyone by sending them this.
                </CardDescription>
                <div className="flex space-x-2 pt-3">
                    <Input value={shareUrl} readOnly />
                    <Button
                        onClick={copyLink}
                        variant="secondary"
                        className="shrink-0"
                    >
                        {copyText === "Copied" ? (
                            <Fragment>
                                <CheckIcon className="mr-1.5 h-4 w-4" />
                                <span>{copyText}</span>
                            </Fragment>
                        ) : (
                            <span>{copyText}</span>
                        )}
                    </Button>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                    <h4 className="text-sm font-medium">Requests to join</h4>
                    {getRequestQuery === undefined && <UserAccessLoading />}
                    {getRequestQuery && getRequestQuery.length > 0 && (
                        <div className="grid gap-6">
                            {getRequestQuery.map((request) => (
                                <AllRequests
                                    key={request._id}
                                    projectId={projectId}
                                    requestId={request._id}
                                    user={{
                                        firstName: request.user
                                            ?.firstName as string,
                                        email: request.user?.email as string[],
                                        lastName: request.user
                                            ?.lastName as string,
                                        imageUrl: request.user
                                            ?.imageUrl as string,
                                    }}
                                    userId={request.userId}
                                />
                            ))}
                        </div>
                    )}
                    {getRequestQuery && getRequestQuery.length === 0 && (
                        <p className="text-muted-foreground">
                            No Request Found
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

type AllRequestsProps = {
    requestId: string;
    user: {
        firstName: string;
        lastName: string;
        email: string[];
        imageUrl: string;
    };
    userId: string;
    projectId: string;
};

function AllRequests({ requestId, userId, projectId, user }: AllRequestsProps) {
    const responseToRequestMutate = useMutation(api.project.responseToRequest);

    const [loading, setLoading] = useState<boolean>(false);

    function handleResponseToRequest({
        accept,
        requestId,
        userId,
    }: {
        requestId: string;
        accept: boolean;
        userId: string;
    }) {
        setLoading(true);
        responseToRequestMutate({
            requestId,
            projectId,
            response: accept ? "accept" : "reject",
            userId,
        })
            .then((res) => {
                toast.success(
                    accept
                        ? "Request has been accepted"
                        : "Request has been rejected",
                );
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="flex w-full flex-col items-start justify-center space-x-0 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
            <div className="flex flex-row items-center space-x-4">
                <Avatar>
                    <AvatarImage src={user?.imageUrl as string} />
                    <AvatarFallback className="uppercase">
                        {user?.firstName?.charAt(0)}
                        {user?.lastName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="line-clamp-1 text-sm font-medium leading-none">
                        {user?.firstName} {user?.lastName}
                    </p>
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                        {user?.email[0]}
                    </p>
                </div>
            </div>
            <div className="w-full space-x-2 sm:w-auto">
                <Button
                    variant="destructive"
                    disabled={loading}
                    className="bg-opacity-50"
                    onClick={() =>
                        handleResponseToRequest({
                            accept: false,
                            requestId,
                            userId,
                        })
                    }
                >
                    <span>Reject</span>
                </Button>
                <Button
                    disabled={loading}
                    variant="secondary"
                    onClick={() =>
                        handleResponseToRequest({
                            accept: true,
                            requestId,
                            userId,
                        })
                    }
                >
                    <span>Accept</span>
                </Button>
            </div>
        </div>
    );
}
