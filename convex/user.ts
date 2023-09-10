import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        clerkId: v.string(),
        email: v.array(v.string()),
        firstName: v.string(),
        lastName: v.string(),
    },
    handler: async (ctx, args) => {
        const createUser = await ctx.db.insert("users", {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            clerkId: args.clerkId,
        });
        return createUser;
    },
});

export const update = mutation({
    args: {
        clerkId: v.string(),
        email: v.array(v.string()),
        firstName: v.string(),
        lastName: v.string(),
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
        });

        return updateUser;
    },
});
