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

export const getById = query({
    args: { pageId: v.string(), projectId: v.string() },
    handler: async (ctx, args) => {
        const pageById = await ctx.db
            .query("page")
            .filter((q) => q.eq(q.field("_id"), args.pageId))
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .unique();

        return pageById;
    },
});

export const update = mutation({
    args: {
        pageId: v.string(),
        projectId: v.string(),
        userId: v.string(),
        content: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const ifUserHasAccessToEdit = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .unique();

        if (!ifUserHasAccessToEdit) {
            throw new Error("User does not have access");
        }

        if (ifUserHasAccessToEdit.role === "canView") {
            throw new Error("User does not have access");
        }

        const updatePage = await ctx.db.patch(args.pageId as Id<"page">, {
            content: args.content,
            title: args.title,
        });

        return updatePage;
    },
});

export const deleteById = mutation({
    args: { pageId: v.string(), projectId: v.string(), userId: v.string() },
    handler: async (ctx, args) => {
        const ifUserHasAccessToEdit = await ctx.db
            .query("users_projects")
            .filter((q) => q.eq(q.field("projectId"), args.projectId))
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .unique();

        if (!ifUserHasAccessToEdit) {
            throw new Error("User does not have access");
        }

        if (ifUserHasAccessToEdit.role === "canView") {
            throw new Error("User does not have access");
        }

        const deletePage = await ctx.db.delete(args.pageId as Id<"page">);

        return deletePage;
    },
});
