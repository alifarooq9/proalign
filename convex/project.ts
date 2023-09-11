import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { projectSchema } from "./schema";

export const create = mutation({
    args: projectSchema,
    handler: async (ctx, args) => {
        const createProject = await ctx.db.insert("projects", args);
        return createProject;
    },
});

export const getAll = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const allProjects = await ctx.db.query("projects").collect();
        const projects = allProjects.filter((p) =>
            p.users.includes(args.userId),
        );

        return projects;
    },
});
