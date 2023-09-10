import AppHeader from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PlusCircleIcon } from "lucide-react";
import { columns } from "./columns";
import { Project } from "@/types/project";

export default function DashboardPage() {
    const projects: Project[] = [
        {
            id: "1",
            badge: "Docs",
            description: "This is a description of first project",
            name: "First Project",
            createdAt: new Date().toLocaleString(),
            expectedCompletionDate: new Date().toLocaleString(),
            priority: "High",
            status: "In Progress",
        },
        {
            id: "2",
            badge: "Fixes",
            description: "This is a description of second project",
            name: "Second Project",
            createdAt: new Date().toLocaleString(),
            expectedCompletionDate: new Date("1990-05-01").toLocaleString(),
            priority: "Medium",
            status: "Todo",
        },
    ];

    return (
        <main className="container space-y-10">
            <AppHeader
                title="Dashboard"
                description="Manage your projects here."
            >
                <Button>
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    <span>Create Project</span>
                </Button>
            </AppHeader>

            <DataTable data={projects} columns={columns} />
        </main>
    );
}
