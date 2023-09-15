import ProjectDangerZoneForm from "@/components/project-danger-zone-form";
import { urls } from "@/config/urls";
import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convex";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type ProjectDangerZonePageProps = {
    params: {
        id: string;
    };
};

export default async function ProjectDangerZonePage({
    params,
}: ProjectDangerZonePageProps) {
    const user = await currentUser();

    const checkIfUserIsOwner = await convex.query(
        api.project.checkIfUserIsOwner,
        {
            projectId: params.id,
            userId: user?.id as string,
        },
    );

    if (!checkIfUserIsOwner) {
        return redirect(urls.app.projectDetails(params.id));
    }

    return (
        <main className="container flex max-w-4xl items-center justify-center space-y-6 px-0 py-6">
            <ProjectDangerZoneForm
                projectId={params.id}
                userId={user?.id as string}
            />
        </main>
    );
}
