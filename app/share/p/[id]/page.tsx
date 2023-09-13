import { ProjectRequestAccessForm } from "@/components/project-request-access-form";
import { Icons } from "@/components/ui/icon";
import { urls } from "@/config/urls";
import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convex";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Fragment } from "react";

type ShareProjectIdProps = {
    params: {
        id: string;
    };
};

export default async function ShareProjectIdPage({
    params,
}: ShareProjectIdProps) {
    const user = await currentUser();

    if (!user) {
        return redirect(urls.auth.login);
    }

    const checkIfUserHasAccess = await convex.query(
        api.project.checkIfUserHasAccess,
        {
            projectId: params.id,
            userId: user.id,
        },
    );

    if (checkIfUserHasAccess) {
        return redirect(urls.app.project(params.id));
    }

    const project = await convex.query(api.project.getById, {
        id: params.id,
    });

    if (!project) {
        return notFound();
    }

    return (
        <Fragment>
            <header className="fixed top-0 z-50 flex h-20 w-full place-content-center place-items-center">
                <Link href="/" className="flex place-items-center">
                    <Icons.logo className="mr-1.5 h-6 w-6" />
                    <span className="text-lg font-bold">PRO ALIGN</span>
                </Link>
            </header>
            <main className="flex min-h-screen w-full items-center justify-center px-4 py-20">
                <ProjectRequestAccessForm
                    projectId={project._id}
                    projectDescription={project.description}
                    projectName={project.name}
                    userId={user.id}
                />
            </main>
        </Fragment>
    );
}
