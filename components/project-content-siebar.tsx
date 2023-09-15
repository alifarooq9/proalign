"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRightIcon, Loader2Icon, PlusCircleIcon } from "lucide-react";
import { urls } from "@/config/urls";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ProjectContentSidebarProps = {
    projectId: string;
    pages:
        | {
              _id: string;
              title: string;
          }[]
        | undefined;
    canEdit: boolean;
};

export function PagesSidebarContent({
    projectId,
    pages,
    canEdit,
}: ProjectContentSidebarProps) {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const [search, setSearch] = useState<string>("");

    const filteredPages = pages?.filter((page) =>
        page.title.toLowerCase().includes(search.toLowerCase()),
    );

    const createPageMutation = useMutation(api.page.create);

    const handleCreatePage = async () => {
        setLoading(true);
        const pageId = await createPageMutation({
            projectId,
            title: "Untitled",
            content: "",
        })
            .then((res) => {
                toast.success("Page created successfully");
                return res;
            })
            .catch(() => {
                toast.error("Failed to create page");
            })
            .finally(() => {
                setLoading(false);
            });

        if (pageId) {
            router.push(urls.app.projectPage({ projectId, pageId }));
        }
    };

    return (
        <div className="space-y-2 p-2">
            <Input
                placeholder="Search"
                className="h-8 rounded-sm p-2 text-sm"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
            />

            <div className="custom-scrollbar h-full max-h-[300px] overflow-y-auto rounded-lg border">
                {pages === undefined && (
                    <div className="space-y-2 p-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                )}
                {filteredPages && filteredPages.length === 0 ? (
                    <p className="p-3 font-semibold capitalize text-muted-foreground">
                        No Pages Found
                    </p>
                ) : (
                    <ul className="grid p-2">
                        {filteredPages &&
                            filteredPages.map((page) => (
                                <li
                                    key={page._id}
                                    className="line-clamp-1 text-sm"
                                >
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex w-full items-center justify-start px-2 text-sm"
                                        asChild
                                    >
                                        <Link
                                            href={urls.app.projectPage({
                                                projectId,
                                                pageId: page._id,
                                            })}
                                        >
                                            <ChevronRightIcon className="mr-1.5 h-4 w-4" />
                                            <span className="line-clamp-1">
                                                {page.title}
                                            </span>
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                    </ul>
                )}
            </div>

            <div className="flex place-content-between place-items-center space-x-1">
                <Button
                    disabled={loading || !canEdit}
                    onClick={handleCreatePage}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                >
                    {loading ? (
                        <Loader2Icon className="mr-1.5 h-4 w-4 animate-spin" />
                    ) : (
                        <PlusCircleIcon className="mr-1.5 h-4 w-4" />
                    )}
                    <span>Create</span>
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
