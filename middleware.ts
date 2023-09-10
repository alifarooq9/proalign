import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { urls } from "@/config/urls";

export default authMiddleware({
    afterAuth(auth, req, evt) {
        const origin = req.nextUrl.origin;
        const path = req.nextUrl.pathname;

        if (auth.userId && path.startsWith("/auth")) {
            return NextResponse.redirect(
                new URL(`${origin}${urls.app.dashboard}`),
            );
        }

        if (!auth.userId && !path.startsWith("/auth") && !auth.isPublicRoute) {
            return NextResponse.redirect(
                new URL(`${origin}${urls.auth.login}`),
            );
        }
    },
    publicRoutes: ["/"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};