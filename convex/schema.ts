import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const projectSchema = {
    name: v.string(),
    description: v.string(),
    badge: v.optional(v.string()),
    status: v.union(
        v.literal("Todo"),
        v.literal("In Progress"),
        v.literal("Completed"),
        v.literal("On Hold"),
        v.literal("Cancelled"),
    ),
    priority: v.union(v.literal("Low"), v.literal("Medium"), v.literal("High")),
    expectedCompletionDate: v.string(),
    owners: v.array(v.string()),
};

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        email: v.optional(v.array(v.string())),
        firstName: v.optional(v.union(v.string(), v.null())),
        lastName: v.optional(v.union(v.string(), v.null())),
        imageUrl: v.optional(v.union(v.string(), v.null())),
    }).index("users", ["email", "clerkId"]),
    projects: defineTable(projectSchema),
    users_projects: defineTable({
        userId: v.string(),
        projectId: v.id("projects"),
        role: v.union(
            v.literal("owner"),
            v.literal("canEdit"),
            v.literal("canView"),
        ),
    }).index("users_project", ["userId", "projectId"]),
    project_requests: defineTable({
        userId: v.string(),
        projectId: v.id("projects"),
    }).index("project_requests", ["projectId"]),
    page: defineTable({
        title: v.string(),
        content: v.string(),
        projectId: v.id("projects"),
    }).index("page", ["projectId"]),
    task: defineTable({
        title: v.string(),
        description: v.string(),
        status: v.union(
            v.literal("1"),
            v.literal("2"),
            v.literal("3"),
            v.literal("4"),
            v.literal("5"),
        ),
        projectId: v.id("projects"),
        users: v.array(v.string()),
    }).index("task", ["projectId"]),
});
