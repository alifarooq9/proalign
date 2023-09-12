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

    return (
        <Card className="container max-w-4xl px-0">
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
                    <div className="grid gap-6">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="/avatars/03.png" />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">
                                        Olivia Martin
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        m@example.com
                                    </p>
                                </div>
                            </div>
                            <Button variant="secondary">Accept</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
