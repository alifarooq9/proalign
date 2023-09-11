import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        email: v.optional(v.array(v.string())),
        firstName: v.optional(v.union(v.string(), v.null())),
        lastName: v.optional(v.union(v.string(), v.null())),
        imageUrl: v.optional(v.union(v.string(), v.null())),
    }),
    projects: defineTable({
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
        priority: v.union(
            v.literal("Low"),
            v.literal("Medium"),
            v.literal("High"),
        ),
        expectedCompletionDate: v.string(),
        users: v.array(v.string()),
        owner: v.object({
            id: v.string(),
            firstName: v.string(),
            lastName: v.string(),
            email: v.string(),
        }),
    }),
});
