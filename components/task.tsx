import { cn } from "@/lib/utils";
import { Draggable } from "react-beautiful-dnd";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

type TaskProps = {
    task: {
        id: string;
        title: string;
        description: string;
        column: string;
    };
    index: number;
    canEdit: boolean;
    projectId: string;
};

export default function Task({ task, index, canEdit, projectId }: TaskProps) {
    return (
        <Draggable
            isDragDisabled={!canEdit}
            key={task.id}
            draggableId={task.id}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={cn(
                        "w-full rounded-lg border-2 border-dashed bg-background p-3",
                        snapshot.isDragging && "bg-secondary",
                    )}
                >
                    <div className="flex items-start justify-between">
                        <h3 className="font-semibold">{task.title}</h3>
                        <TaskMenu projectId={projectId} taskId={task.id} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {task.description}
                    </p>
                </div>
            )}
        </Draggable>
    );
}

type TaskMenuProps = {
    projectId: string;
    taskId: string;
};

function TaskMenu({ projectId, taskId }: TaskMenuProps) {
    const deleteTaskMutation = useMutation(api.task.deleteById);

    const { userId } = useAuth();

    const handleDelete = async () => {
        await deleteTaskMutation({
            projectId,
            taskId,
            userId: userId as string,
        })
            .then(() => {
                toast.success("Task deleted successfully");
            })
            .catch(() => {
                toast.error("Task deletion failed");
            });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="pl-2">
                <MoreVerticalIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={handleDelete}
                    className="cursor-pointer text-destructive focus:text-destructive"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
