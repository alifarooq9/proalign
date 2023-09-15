"use client";

import CreateTaskForm from "@/components/create-task-form";
import Task from "@/components/task";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type TasksPageProps = {
    params: {
        id: string;
    };
};

export default function TasksPage({ params }: TasksPageProps) {
    const { userId } = useAuth();

    const columns = [
        {
            id: "1",
            title: "Todo",
        },
        {
            id: "2",
            title: "In Progress",
        },
        {
            id: "3",
            title: "Done",
        },
        {
            id: "4",
            title: "On Hold",
        },
        {
            id: "5",
            title: "Cancel",
        },
    ] as const;

    const tasks = useQuery(api.task.getAll, {
        projectId: params.id,
    });

    const checkIfUserCanEdit = useQuery(api.project.getUsersProjectById, {
        projectId: params.id,
        userId: userId as string,
    });

    if (tasks === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <main className="w-full">
            <DragDropContext
                onDragEnd={(data) => {
                    console.log("drag end", data);
                }}
            >
                <div className="flex w-full flex-wrap gap-3">
                    {columns.map((column) => (
                        <div
                            key={column.id}
                            className={cn(
                                "h-fit w-full rounded-lg border-2 border-dashed bg-background p-3 sm:w-72",
                            )}
                        >
                            <h2 className="font-semibold">{column.title}</h2>

                            <Droppable droppableId={column.id} type="task">
                                {(provided, snapshot) => {
                                    const filteredTasks = tasks.filter(
                                        (task) => task.status === column.id,
                                    );

                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={cn(
                                                "mt-4 w-full space-y-3 rounded-lg",
                                                snapshot.isDraggingOver &&
                                                    "bg-secondary",
                                            )}
                                        >
                                            {filteredTasks.map(
                                                (task, index) => (
                                                    <Task
                                                        index={index}
                                                        task={{
                                                            column: task.status,
                                                            description:
                                                                task.description,
                                                            id: task._id,
                                                            title: task.title,
                                                        }}
                                                        key={index}
                                                        canEdit={
                                                            checkIfUserCanEdit?.role !==
                                                            "canView"
                                                        }
                                                    />
                                                ),
                                            )}

                                            {provided.placeholder}

                                            <CreateTaskForm
                                                columnId={column.id}
                                                columns={columns as any}
                                                projectId={params.id}
                                                userId={userId as string}
                                            />
                                        </div>
                                    );
                                }}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </main>
    );
}
