"use client";

import { Project } from "@/types/project";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { urls } from "@/config/urls";
import {
    AlertTriangleIcon,
    ChevronLeftIcon,
    FilesIcon,
    ListChecksIcon,
    PresentationIcon,
    SettingsIcon,
    Users2Icon,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    PagesSidebarContent,
    WhiteboardsSidebarContent,
} from "@/components/project-content-siebar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const projectSettings = [
    {
        name: "Project Details",
        icon: SettingsIcon,
        url: urls.app.projectDetails,
        whoCanAccess: "owcollaboratorner",
    },
    {
        name: "Collaborators",
        icon: Users2Icon,
        url: urls.app.projectCollaborators,
        whoCanAccess: "owner",
    },
    {
        name: "Danger Zone",
        icon: AlertTriangleIcon,
        url: urls.app.projectDangerZone,
        whoCanAccess: "owner",
    },
];

type ProjectSideNavProps = {
    project: Project;
    userId: string;
};

export default function Sidebar({ project, userId }: ProjectSideNavProps) {
    const isTheOwner = project.owners?.includes(userId);

    const pages = useQuery(api.page.getAll, {
        projectId: project.id as string,
    });

    return (
        <aside className="sticky left-0 top-20 hidden w-72 rounded-lg border-2 border-dashed bg-background/70 backdrop-blur-[2px] xl:block xl:h-[calc(100vh-6rem)]">
            <ScrollArea className="h-full w-full rounded-lg p-4">
                <Button
                    variant="secondary"
                    className="flex w-full items-center justify-start px-4"
                    asChild
                >
                    <Link href={urls.app.dashboard}>
                        <ChevronLeftIcon className="mr-1.5 h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                </Button>

                <div className="mt-3 w-full border-y py-3">
                    <h3 className="line-clamp-1 text-lg font-semibold">
                        {project.name}
                    </h3>

                    <p className="line-clamp-1 w-full text-sm text-muted-foreground">
                        {project.description}
                    </p>
                </div>

                <nav>
                    <div className="mt-4 space-y-2">
                        <h4 className="font-semibold text-muted-foreground">
                            Project Settings
                        </h4>

                        {projectSettings.map((settingBtn) => {
                            if (
                                settingBtn.whoCanAccess === "owner" &&
                                !isTheOwner
                            )
                                return null;

                            return (
                                <Button
                                    key={settingBtn.name}
                                    variant="outline"
                                    className="flex w-full items-center justify-start px-4"
                                    asChild
                                >
                                    <Link
                                        href={settingBtn.url(
                                            project.id as string,
                                        )}
                                    >
                                        <settingBtn.icon className="mr-1.5 h-4 w-4" />
                                        <span>{settingBtn.name}</span>
                                    </Link>
                                </Button>
                            );
                        })}
                    </div>

                    <div className="mt-4 space-y-2">
                        <h4 className="font-semibold text-muted-foreground">
                            Project Content
                        </h4>

                        <Button
                            variant="outline"
                            size="lg"
                            className="flex w-full items-center justify-start px-4"
                            asChild
                        >
                            <Link href={urls.app.dashboard}>
                                <ListChecksIcon className="mr-1.5 h-4 w-4" />
                                <span>Tasks</span>
                            </Link>
                        </Button>

                        <Accordion
                            type="single"
                            collapsible
                            className={"rounded-lg border"}
                        >
                            <AccordionItem
                                value="tasks"
                                className="border-none"
                            >
                                <Button
                                    variant="ghost"
                                    className="flex w-full items-center justify-start px-4"
                                    asChild
                                >
                                    <AccordionTrigger className="justify-between">
                                        <span className="flex place-items-center">
                                            <FilesIcon className="mr-1.5 h-4 w-4" />
                                            <span>Pages</span>
                                        </span>
                                    </AccordionTrigger>
                                </Button>

                                <AccordionContent>
                                    <PagesSidebarContent
                                        projectId={project.id as string}
                                        pages={pages}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion
                            type="single"
                            collapsible
                            className={"rounded-lg border"}
                        >
                            <AccordionItem
                                value="whiteboards"
                                className="border-none"
                            >
                                <Button
                                    variant="ghost"
                                    className="flex w-full items-center justify-start px-4"
                                    asChild
                                >
                                    <AccordionTrigger className="justify-between">
                                        <span className="flex place-items-center">
                                            <PresentationIcon className="mr-1.5 h-4 w-4" />
                                            <span>Whiteboards</span>
                                        </span>
                                    </AccordionTrigger>
                                </Button>

                                <AccordionContent>
                                    <WhiteboardsSidebarContent />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </nav>
            </ScrollArea>
        </aside>
    );
}
