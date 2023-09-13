import ProjectAccessForm from "@/components/project-access-form";
import ProjectMembersForm from "@/components/project-members-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { urls } from "@/config/urls";
import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convex";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type CollaboratorsPageProps = {
    params: {
        id: string;
    };
};

export default async function CollaboratorsPage({
    params,
}: CollaboratorsPageProps) {
    const user = await currentUser();

    const checkIfUserIsOwner = await convex.query(
        api.project.checkIfUserIsOwner,
        {
            projectId: params.id,
            userId: user?.id as string,
        },
    );

    if (!checkIfUserIsOwner) {
        return redirect(urls.app.project(params.id));
    }

    return (
        <main className="container flex w-full max-w-4xl items-center justify-center space-y-6 px-0 py-6">
            <Tabs defaultValue="members" className="w-full">
                <TabsList>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="access">Access</TabsTrigger>
                </TabsList>
                <TabsContent value="members">
                    <ProjectMembersForm
                        projectId={params.id}
                        userId={user?.id as string}
                    />
                </TabsContent>
                <TabsContent value="access">
                    <ProjectAccessForm projectId={params.id} />
                </TabsContent>
            </Tabs>
        </main>
    );
}
