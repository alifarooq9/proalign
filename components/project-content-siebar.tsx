"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { urls } from "@/config/urls";

type ProjectContentSidebarProps = {
    projectId: string;
};

export function PagesSidebarContent({ projectId }: ProjectContentSidebarProps) {
    const pages = ["Page 1", "Page 2", "Page 3", "Page 4", "Page 5", "Page 6"];

    return (
        <div className="space-y-2 p-2">
            <Input
                placeholder="Search"
                className="h-8 rounded-sm p-2 text-sm"
            />

            <div className="custom-scrollbar h-full max-h-[300px] overflow-y-auto rounded-lg border">
                {pages.length === 0 ? (
                    <p className="p-3 font-semibold capitalize text-muted-foreground">
                        No Pages Found
                    </p>
                ) : (
                    <ul className="grid p-2">
                        {pages.map((page) => (
                            <li key={page} className="line-clamp-1 text-sm">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex w-full items-center justify-start px-2 text-sm"
                                    asChild
                                >
                                    <Link
                                        href={urls.app.projectPage({
                                            projectId,
                                            pageId: page,
                                        })}
                                    >
                                        <ChevronRightIcon className="mr-1.5 h-4 w-4" />
                                        <span>{page}</span>
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex place-content-between place-items-center space-x-1">
                <Input placeholder="Title" className="h-8 rounded-sm p-2" />
                <Button variant="secondary" size="sm">
                    Create
                </Button>
            </div>
        </div>
    );
}

export function WhiteboardsSidebarContent() {
    const whiteboards = [
        "Whiteboard 1",
        "Whiteboard 2",
        "Whiteboard 3",
        "Whiteboard 4",
        "Whiteboard 5",
        "Whiteboard 6",
    ];

    return (
        <div className="space-y-2 p-2">
            <Input
                placeholder="Search"
                className="h-8 rounded-sm p-2 text-sm"
            />

            <div className="custom-scrollbar h-full max-h-[300px] overflow-y-auto rounded-lg border">
                {whiteboards.length === 0 ? (
                    <p className="p-3 font-semibold capitalize text-muted-foreground">
                        No Whiteboards Found
                    </p>
                ) : (
                    <ul className="grid p-2">
                        {whiteboards.map((whiteboard) => (
                            <li
                                key={whiteboard}
                                className="line-clamp-1 text-sm"
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex w-full items-center justify-start px-2 text-sm"
                                    asChild
                                >
                                    <Link href="#">
                                        <ChevronRightIcon className="mr-1.5 h-4 w-4" />
                                        <span>{whiteboard}</span>
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex place-content-between place-items-center space-x-1">
                <Input placeholder="Title" className="h-8 rounded-sm p-2" />
                <Button variant="secondary" size="sm">
                    Create
                </Button>
            </div>
        </div>
    );
}
