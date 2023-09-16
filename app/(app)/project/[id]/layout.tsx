import Sidebar from "@/components/sidebar";
import { urls } from "@/config/urls";
import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convex";
import { currentUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import Header from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton } from "@clerk/nextjs";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Fragment } from "react";
import SheetMenu from "@/components/sheet-menu";

type ProjectIdLayoutProps = {
    children: ReactNode;
    params: {
        id: string;
    };
};

export async function generateMetadata({ params }: { params: { id: string } }) {
    const project = await convex.query(api.project.getById, {
        id: params.id,
    });

    if (!project) {
        return {
            title: "Project not found",
        };
    }

    return {
        title: project.name + " | Request Access",
    };
}

export default async function ProjectIdLayout({
    children,
    params,
}: ProjectIdLayoutProps) {
    const user = await currentUser();

    if (!user) {
        return redirect(urls.auth.login);
    }

    const isUserHasAccess = await convex.query(
        api.project.checkIfUserHasAccess,
        {
            projectId: params.id,
            userId: user.id,
        },
    );

    if (isUserHasAccess === false) {
        return notFound();
    }

    const projectDetails = await convex.query(api.project.getById, {
        id: params.id,
    });

    if (projectDetails === null) {
        return notFound();
    }

    return (
        <Fragment>
            <Header
                AuthElement={AuthElement}
                SheetMenu={
                    <SheetMenu
                        project={{
                            name: projectDetails.name,
                            description: projectDetails.description,
                            expectedCompletionDate:
                                projectDetails.expectedCompletionDate,
                            id: projectDetails._id,
                            priority: projectDetails.priority,
                            status: projectDetails.status,
                            _creationTime:
                                projectDetails._creationTime.toLocaleString(),
                            owners: projectDetails.owners,
                            badge: projectDetails.badge,
                        }}
                        userId={user.id as string}
                    />
                }
            />
            <div className="flex gap-5 px-4 sm:px-3">
                <Sidebar
                    project={{
                        name: projectDetails.name,
                        description: projectDetails.description,
                        expectedCompletionDate:
                            projectDetails.expectedCompletionDate,
                        id: projectDetails._id,
                        priority: projectDetails.priority,
                        status: projectDetails.status,
                        _creationTime:
                            projectDetails._creationTime.toLocaleString(),
                        owners: projectDetails.owners,
                        badge: projectDetails.badge,
                    }}
                    userId={user.id as string}
                    sticky={true}
                />
                <div className="flex-1">{children}</div>
            </div>
        </Fragment>
    );
}

function AuthElement() {
    return (
        <Fragment>
            <ClerkLoading>
                <Skeleton className="aspect-square w-10 rounded-full" />
            </ClerkLoading>
            <ClerkLoaded>
                <UserButton afterSignOutUrl={urls.auth.login} />
            </ClerkLoaded>
        </Fragment>
    );
}
