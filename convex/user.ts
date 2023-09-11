import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        clerkId: v.string(),
        email: v.optional(v.array(v.string())),
        firstName: v.optional(v.union(v.string(), v.null())),
        lastName: v.optional(v.union(v.string(), v.null())),
        imageUrl: v.optional(v.union(v.string(), v.null())),
    },
    handler: async (ctx, args) => {
        const createUser = await ctx.db.insert("users", {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            clerkId: args.clerkId,
            imageUrl: args.imageUrl,
        });

        return createUser;
    },
});

export const update = mutation({
    args: {
        clerkId: v.string(),
        email: v.optional(v.array(v.string())),
        firstName: v.optional(v.union(v.string(), v.null())),
        lastName: v.optional(v.union(v.string(), v.null())),
        imageUrl: v.optional(v.union(v.string(), v.null())),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        const updateUser = await ctx.db.patch(user._id, {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            imageUrl: args.imageUrl,
        });

        return updateUser;
    },
});

export const deleteById = mutation({
    args: {
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        const deleteUser = await ctx.db.delete(user._id);

        return deleteUser;
    },
});
