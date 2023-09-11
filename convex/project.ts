import { mutation } from "./_generated/server";
import { projectSchema } from "./schema";

export const create = mutation({
    args: projectSchema,
    handler: async (ctx, args) => {
        const createProject = await ctx.db.insert("projects", args);
        return createProject;
    },
});
