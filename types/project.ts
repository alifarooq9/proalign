export type ProjectStatus =
    | "Todo"
    | "In Progress"
    | "Completed"
    | "On Hold"
    | "Cancelled";

export type ProjectPriority = "Low" | "Medium" | "High";

export type Project = {
    id: string;
    name: string;
    description: string;
    badge: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    expectedCompletionDate: string;
    createdAt: string;
};
