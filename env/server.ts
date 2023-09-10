import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        CLERK_SECRET_KEY: z.string().min(1),
        WEBHOOK_SECRET: z.string().min(1),
        CONVEX_URL: z.string().min(1),
    },
    runtimeEnv: {
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
        CONVEX_URL: process.env.CONVEX_URL,
    },
});
