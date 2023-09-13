import ProjectAccessForm from "@/components/project-access-form";
import ProjectMembersForm from "@/components/project-members-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from "@clerk/nextjs";

type CollaboratorsPageProps = {
    params: {
        id: string;
    };
};

export default async function CollaboratorsPage({
    params,
}: CollaboratorsPageProps) {
    const user = await currentUser();

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
