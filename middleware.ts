import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { urls } from "@/config/urls";
import { convex } from "./lib/convex";
import { api } from "./convex/_generated/api";

export default authMiddleware({
    async afterAuth(auth, req, evt) {
        if (auth.isPublicRoute) return NextResponse.next();

        const origin = req.nextUrl.origin;
        const path = req.nextUrl.pathname;

        const projects = await convex.query(api.project.getAll, {
            userId: auth.userId as string,
        });

        console.log(projects);

        if (auth.userId && path.startsWith("/auth")) {
            return NextResponse.redirect(
                new URL(`${origin}${urls.app.dashboard}`),
            );
        }

        if (!auth.userId && !path.startsWith("/auth")) {
            return NextResponse.redirect(
                new URL(`${origin}${urls.auth.login}`),
            );
        }
    },
    publicRoutes: ["/", "/api/webhooks/auth"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
