import AppHeader from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function DashboardPage() {
    return (
        <main className="container">
            <AppHeader
                title="Dashboard"
                description="Manage your projects here."
            >
                <Button>
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    <span>Create Project</span>
                </Button>
            </AppHeader>
        </main>
    );
}
