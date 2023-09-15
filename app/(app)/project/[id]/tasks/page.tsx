"use client";

import CreateTaskForm from "@/components/create-task-form";
import Task from "@/components/task";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

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

    const updateStatusMutation = useMutation(api.task.updateStatus);

    const handleTaskUpdate = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (!tasks) {
            return;
        }

        const task = tasks.find((task) => task._id === draggableId);

        if (!task) {
            return;
        }

        const newStatus = columns.find(
            (column) => column.id === destination.droppableId,
        );

        if (!newStatus) {
            return;
        }

        await updateStatusMutation({
            status: newStatus.id,
            id: task._id,
            projectId: params.id,
            userId: userId as string,
        });
    };

    if (tasks === undefined) {
        return (
            <div className="flex w-full flex-wrap gap-3">
                <Skeleton className="h-48 w-full sm:w-72" />
                <Skeleton className="h-48 w-full sm:w-72" />
                <Skeleton className="h-48 w-full sm:w-72" />
                <Skeleton className="h-48 w-full sm:w-72" />
                <Skeleton className="h-48 w-full sm:w-72" />
            </div>
        );
    }

    return (
        <main className="w-full">
            <DragDropContext onDragEnd={handleTaskUpdate}>
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
                                                            users: task.users
                                                                ? task.users.map(
                                                                      (
                                                                          user,
                                                                      ) => ({
                                                                          email: user?.email as string[],
                                                                          firstName:
                                                                              user?.firstName as string,
                                                                          id: user?.clerkId as string,
                                                                          imageUrl:
                                                                              user?.imageUrl as string,
                                                                          lastName:
                                                                              user?.lastName as string,
                                                                      }),
                                                                  )
                                                                : [],
                                                        }}
                                                        key={index}
                                                        canEdit={
                                                            checkIfUserCanEdit?.role !==
                                                            "canView"
                                                        }
                                                        projectId={params.id}
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
