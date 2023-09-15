import Providers from "@/components/providers";
import "./globals.css";
import type { Metadata } from "next";
import { bricolageGrotesque } from "@/lib/fonts";
import Background from "@/components/ui/background";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
    title: {
        default: "PRO ALIGN | Work on your project ideas with your team",
        template: "%s | PRO ALIGN",
    },
    description:
        "Welcome to PRO ALIGN, your all-in-one solution for efficient task management. Create, organize, and share tasks, and pages with your team effortlessly.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body
                className={cn(
                    bricolageGrotesque.className,
                    "w-full overflow-x-hidden",
                )}
            >
                <Providers>
                    {children}
                    <Background />
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
