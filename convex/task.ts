import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        status: v.union(
            v.literal("1"),
            v.literal("2"),
            v.literal("3"),
            v.literal("4"),
            v.literal("5"),
        ),
        projectId: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const checkIfUserHasAccess = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .unique();

        if (!checkIfUserHasAccess) {
            throw new Error("User does not have access");
        }

        if (checkIfUserHasAccess.role === "canView") {
            throw new Error("User does not have access");
        }

        const createTask = await ctx.db.insert("task", {
            title: args.title,
            description: args.description,
            status: args.status,
            projectId: args.projectId as Id<"projects">,
        });

        return createTask;
    },
});

export const getAll = query({
    args: {
        projectId: v.string(),
    },
    handler: async (ctx, args) => {
        const tasks = await ctx.db
            .query("task")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .collect();

        return tasks;
    },
});

export const updateStatus = mutation({
    args: {
        id: v.string(),
        status: v.union(
            v.literal("1"),
            v.literal("2"),
            v.literal("3"),
            v.literal("4"),
            v.literal("5"),
        ),
        projectId: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const checkIfUserHasAccess = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .unique();

        if (!checkIfUserHasAccess) {
            throw new Error("User does not have access");
        }

        if (checkIfUserHasAccess.role === "canView") {
            throw new Error("User does not have access");
        }

        const updateTask = await ctx.db.patch(args.id as Id<"task">, {
            status: args.status,
        });

        return updateTask;
    },
});

export const deleteById = mutation({
    args: {
        taskId: v.string(),
        projectId: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const checkIfUserHasAccess = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .unique();

        if (!checkIfUserHasAccess) {
            throw new Error("User does not have access");
        }

        if (checkIfUserHasAccess.role === "canView") {
            throw new Error("User does not have access");
        }

        const deleteTask = await ctx.db.delete(args.taskId as Id<"task">);

        return deleteTask;
    },
});
