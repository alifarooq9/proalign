"use client";

import CreateTaskForm from "@/components/create-task-form";
import Task from "@/components/task";
import { cn } from "@/lib/utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TasksPage() {
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
    ];

    const tasks = [
        {
            id: "task1",
            title: "Task 1",
            description: "This is task 1",
            column: "1",
        },
        {
            id: "task2",
            title: "Task 2",
            description: "This is task 2",
            column: "1",
        },
    ];

    return (
        <main className="w-full">
            <DragDropContext
                onDragEnd={(data) => {
                    console.log("drag end", data);
                }}
            >
                <Droppable
                    droppableId="todos"
                    type="column"
                    direction="horizontal"
                >
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={cn("flex w-full flex-wrap gap-4")}
                        >
                            {columns.map((column, index) => (
                                <Draggable
                                    key={column.id}
                                    draggableId={column.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className={cn(
                                                "h-fit w-72 rounded-lg border-2 border-dashed bg-background p-3",
                                            )}
                                        >
                                            <h2 className="font-semibold">
                                                {column.title}
                                            </h2>

                                            <Droppable
                                                droppableId={column.id}
                                                type="task"
                                            >
                                                {(provided, snapshot) => {
                                                    const filteredTasks =
                                                        tasks.filter(
                                                            (task) =>
                                                                task.column ===
                                                                column.id,
                                                        );

                                                    return (
                                                        <div
                                                            {...provided.droppableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            className={cn(
                                                                "mt-4 w-full space-y-3 rounded-lg",
                                                                snapshot.isDraggingOver &&
                                                                    "bg-secondary",
                                                            )}
                                                        >
                                                            {filteredTasks.map(
                                                                (
                                                                    task,
                                                                    index,
                                                                ) => (
                                                                    <Task
                                                                        index={
                                                                            index
                                                                        }
                                                                        task={
                                                                            task
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                    />
                                                                ),
                                                            )}

                                                            {
                                                                provided.placeholder
                                                            }

                                                            <CreateTaskForm
                                                                columnId={
                                                                    column.id
                                                                }
                                                                columns={
                                                                    columns
                                                                }
                                                            />
                                                        </div>
                                                    );
                                                }}
                                            </Droppable>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </main>
    );
}
