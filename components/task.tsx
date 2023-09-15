import { cn } from "@/lib/utils";
import { Draggable } from "react-beautiful-dnd";

type TaskProps = {
    task: {
        id: string;
        title: string;
        description: string;
        column: string;
    };
    index: number;
    canEdit: boolean;
};

export default function Task({ task, index, canEdit }: TaskProps) {
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
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {task.description}
                    </p>
                </div>
            )}
        </Draggable>
    );
}
