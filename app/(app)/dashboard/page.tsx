import AppHeader from "@/components/app-header";
import {
    CreateProjectDrawer,
    CreateProjectDrawerTrigger,
} from "@/components/create-project-drawer";
import ProjectsTable from "@/components/projects-table";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function DashboardPage() {
    return (
        <main className="container space-y-10">
            <AppHeader
                title="Dashboard"
                description="Manage your projects here."
            >
                <CreateProjectDrawerTrigger asChild>
                    <Button>
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        <span>Create Project</span>
                    </Button>
                </CreateProjectDrawerTrigger>
            </AppHeader>

            <ProjectsTable />

            <CreateProjectDrawer />
        </main>
    );
}
