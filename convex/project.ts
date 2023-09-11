import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { projectSchema } from "./schema";

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
            return await ctx.db
                .query("projects")
                .filter((q) => q.eq(q.field("_id"), p.projectId))
                .collect();
        });

        return (await Promise.all(allProjects)).flat();
    },
});
