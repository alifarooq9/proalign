import { env } from "@/env/server";
import { ConvexHttpClient } from "convex/browser";

export const convex = new ConvexHttpClient(env.CONVEX_URL);
