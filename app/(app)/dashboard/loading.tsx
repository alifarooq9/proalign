import AppHeader from "@/components/app-header";
import { ProjectTableLoading } from "@/components/projects-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircleIcon } from "lucide-react";

export default function DashboardLoading() {
    return (
        <main className="container space-y-10">
            <AppHeader
                title="Dashboard"
                description="Manage your projects here."
            >
                <Button disabled>
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    <span>Create Project</span>
                </Button>
            </AppHeader>

            <ProjectTableLoading />
        </main>
    );
}
