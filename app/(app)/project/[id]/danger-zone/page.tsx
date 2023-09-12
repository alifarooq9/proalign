import ProjectDangerZoneForm from "@/components/project-danger-zone-form";
import { currentUser } from "@clerk/nextjs";

type ProjectDangerZonePageProps = {
    params: {
        id: string;
    };
};

export default async function ProjectDangerZonePage({
    params,
}: ProjectDangerZonePageProps) {
    const user = await currentUser();

    return (
        <main className="container flex max-w-4xl items-center justify-center space-y-6 px-0 py-6">
            <ProjectDangerZoneForm
                projectId={params.id}
                userId={user?.id as string}
            />
        </main>
    );
}
