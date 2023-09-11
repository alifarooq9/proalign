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
    }).index("users_project", ["userId"]),
});
