import ProjectAccessForm from "@/components/project-access-form";
import ProjectMembersForm from "@/components/project-members-form";
import { Skeleton } from "@/components/ui/skeleton";
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

export function UserAccessLoading() {
    return (
        <div className="grid gap-6">
            <div className="flex h-12 w-full flex-col items-start justify-center space-x-0 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
                <Skeleton className="h-full w-full max-w-[20rem]" />
                <div className="flex h-full w-full flex-row items-center justify-start gap-2 sm:justify-end">
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                </div>
            </div>
            <div className="flex h-12 w-full flex-col items-start justify-center space-x-0 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
                <Skeleton className="h-full w-full max-w-[20rem]" />
                <div className="flex h-full w-full flex-row items-center justify-start gap-2 sm:justify-end">
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                </div>
            </div>
            <div className="flex h-12 w-full flex-col items-start justify-center space-x-0 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
                <Skeleton className="h-full w-full max-w-[20rem]" />
                <div className="flex h-full w-full flex-row items-center justify-start gap-2 sm:justify-end">
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                </div>
            </div>
        </div>
    );
}
