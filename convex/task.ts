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
            users: [args.userId],
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

        const getUsersDetails = await Promise.all(
            tasks.map(async (task) => {
                const users = task.users.map(async (user) => {
                    const userDetails = await ctx.db
                        .query("users")
                        .filter((q) => q.eq(q.field("clerkId"), user))
                        .unique();

                    return userDetails;
                });

                const usersDetails = await Promise.all(users);

                return {
                    ...task,
                    users: usersDetails,
                };
            }),
        );

        return getUsersDetails;
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

export const removeUserFromTask = mutation({
    args: {
        taskId: v.string(),
        userId: v.string(),
        projectId: v.string(),
        ownerId: v.string()
    },
    handler: async (ctx, args) => {
        const checkIfUserHasAccess = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .filter((q) => q.eq(q.field("userId"), args.ownerId))
            .unique();

        if (!checkIfUserHasAccess) {
            throw new Error("User does not have access");
        }

        if (checkIfUserHasAccess.role === "canView") {
            throw new Error("User does not have access");
        }

        const checkIfUserIsAlreadyAssigned = await ctx.db.get(
            args.taskId as Id<"task">,
        );

        if (!checkIfUserIsAlreadyAssigned) {
            throw new Error("Task does not exist");
        }

        if (!checkIfUserIsAlreadyAssigned.users.includes(args.userId)) {
            throw new Error("User is not assigned to this task");
        }

        const removeUserFromTask = await ctx.db.patch(
            args.taskId as Id<"task">,
            {
                users: checkIfUserIsAlreadyAssigned.users.filter(
                    (user) => user !== args.userId,
                ),
            },
        );

        return removeUserFromTask;
    },
});

export const assignTaskToUser = mutation({
    args: {
        taskId: v.string(),
        ownerId: v.string(),
        userId: v.string(),
        projectId: v.string(),
    },
    handler: async (ctx, args) => {
        const checkIfUserHasAccess = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .filter((q) => q.eq(q.field("userId"), args.ownerId))
            .unique();

        if (!checkIfUserHasAccess) {
            throw new Error("User does not have access");
        }

        if (checkIfUserHasAccess.role === "canView") {
            throw new Error("User does not have access");
        }

        const checkIfUserIsAlreadyAssigned = await ctx.db.get(
            args.taskId as Id<"task">,
        );

        if (!checkIfUserIsAlreadyAssigned) {
            throw new Error("Task does not exist");
        }

        if (checkIfUserIsAlreadyAssigned.users.includes(args.userId)) {
            throw new Error("User is already assigned to this task");
        }

        const assignTaskToUser = await ctx.db.patch(args.taskId as Id<"task">, {
            users: [...checkIfUserIsAlreadyAssigned.users, args.userId],
        });

        return assignTaskToUser;
    },
});
