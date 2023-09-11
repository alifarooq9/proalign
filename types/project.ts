import { z } from "zod";

export const ProjectStatusSchema = z.enum([
    "Todo",
    "In Progress",
    "Completed",
    "On Hold",
    "Cancelled",
]);

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const projectStatuses: ProjectStatus[] = [
    "Todo",
    "In Progress",
    "Completed",
    "On Hold",
    "Cancelled",
];

export const ProjectPrioritySchema = z.enum(["Low", "Medium", "High"]);

export type ProjectPriority = z.infer<typeof ProjectPrioritySchema>;

export const projectPriorities: ProjectPriority[] = ["Low", "Medium", "High"];

export type Project = {
    id?: string;
    name: string;
    description: string;
    badge?: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    _creationTime?: string;
    expectedCompletionDate: string;
    owners?: string[];
};
