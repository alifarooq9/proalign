import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { projectSchema } from "./schema";
import { Id } from "./_generated/dataModel";

export const create = mutation({
    args: { ...projectSchema, userId: v.string() },
    handler: async (ctx, args) => {
        const createProject = await ctx.db.insert("projects", {
            name: args.name,
            description: args.description,
            owners: [args.userId],
            badge: args.badge,
            expectedCompletionDate: args.expectedCompletionDate,
            priority: args.priority,
            status: args.status,
        });

        await ctx.db.insert("users_projects", {
            userId: args.userId,
            projectId: createProject,
            role: "owner",
        });

        return createProject;
    },
});

export const getAll = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const allUsersPorjects = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .collect();

        const allProjects = allUsersPorjects.map(async (p) => {
            const projects = await ctx.db.get(p.projectId);
            return projects || [];
        });

        return (await Promise.all(allProjects)).flat();
    },
});

export const getById = query({
    args: { id: v.string() },

    handler: async (ctx, args) => {
        const project = await ctx.db.get(args.id as Id<"projects">);
        return project;
    },
});

export const checkIfUserHasAccess = query({
    args: { userId: v.string(), projectId: v.string() },
    handler: async (ctx, args) => {
        const userProject = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .unique();

        if (!userProject) {
            return false;
        }

        return userProject.userId === args.userId;
    },
});

export const update = mutation({
    args: {
        ...projectSchema,
        id: v.string(),
    },
    handler: async (ctx, args) => {
        const updatedProject = await ctx.db.patch(args.id as Id<"projects">, {
            name: args.name,
            description: args.description,
            expectedCompletionDate: args.expectedCompletionDate,
            status: args.status,
            badge: args.badge,
            priority: args.priority,
        });

        return updatedProject;
    },
});

export const requestProjectAccess = mutation({
    args: { userId: v.string(), projectId: v.string() },
    handler: async (ctx, args) => {
        const ifAlreadyRequested = await ctx.db
            .query("project_requests")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .unique();

        if (ifAlreadyRequested) {
            return ifAlreadyRequested;
        }

        const projectRequest = await ctx.db.insert("project_requests", {
            userId: args.userId,
            projectId: args.projectId as Id<"projects">,
        });
        return projectRequest;
    },
});

export const getRequests = query({
    args: { projectId: v.string() },
    handler: async (ctx, args) => {
        const projectRequests = await ctx.db
            .query("project_requests")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .collect();

        const projectRequestsWithUserDetails = await Promise.all(
            projectRequests.map(async (p) => {
                const user = await ctx.db
                    .query("users")
                    .filter((q) => q.eq(q.field("clerkId"), p.userId))
                    .unique();
                return { ...p, user };
            }),
        );

        return projectRequestsWithUserDetails.flat();
    },
});

export const responseToRequest = mutation({
    args: {
        userId: v.string(),
        projectId: v.string(),
        response: v.union(v.literal("accept"), v.literal("reject")),
        requestId: v.string(),
    },
    handler: async (ctx, args) => {
        if (args.response === 'accept') {
            const createUsersProject = await ctx.db.insert("users_projects", {
                userId: args.userId,
                projectId: args.projectId as Id<"projects">,
                role: "canView",
            })

            await ctx.db.delete(args.requestId as Id<"project_requests">);

            return createUsersProject;
        }

        if(args.response === 'reject') {
            return await ctx.db.delete(args.requestId as Id<"project_requests">);
        }
    },
});
