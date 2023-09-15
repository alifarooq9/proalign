import { cn } from "@/lib/utils";
import { Draggable } from "react-beautiful-dnd";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AssignUsersTask from "./assign-users-task";

type TaskProps = {
    task: {
        id: string;
        title: string;
        description: string;
        column: string;
        users: {
            id: string;
            firstName: string;
            lastName: string;
            email: string[];
            imageUrl: string;
        }[];
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
                    <div className="mt-2 flex items-center justify-between">
                        <div className="flex flex-wrap items-start gap-2">
                            {task.users.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex flex-row items-center space-x-2"
                                >
                                    <Avatar className="h-7 w-7">
                                        <AvatarImage
                                            src={user?.imageUrl as string}
                                        />
                                        <AvatarFallback className="uppercase">
                                            {user?.firstName?.charAt(0)}
                                            {user?.lastName?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            ))}
                        </div>
                        <AssignUsersTask
                            projectId={projectId}
                            taskId={task.id}
                            taskUsers={task.users}
                        />
                    </div>
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
