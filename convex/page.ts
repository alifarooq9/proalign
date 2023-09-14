import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
    args: { title: v.string(), content: v.string(), projectId: v.string() },
    handler: async (ctx, args) => {
        const createPage = await ctx.db.insert("page", {
            title: args.title,
            content: args.content,
            projectId: args.projectId as Id<"projects">,
        });
        return createPage;
    },
});

export const getAll = query({
    args: { projectId: v.string() },
    handler: async (ctx, args) => {
        const allPages = await ctx.db
            .query("page")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .collect();
        return allPages;
    },
});
