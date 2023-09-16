import Sidebar from "@/components/sidebar";
import { Project } from "@/types/project";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

type SheetMenuProps = {
    project: Project;
    userId: string;
};

export default function SheetMenu({ project, userId }: SheetMenuProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 text-sm"
                >
                    <MenuIcon className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <Sidebar project={project} userId={userId} sticky={false} />
            </SheetContent>
        </Sheet>
    );
}
