import { env } from "@/env/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateProjectShareLink(projectId: string): string {
    return `${env.NEXT_PUBLIC_VERCEL_URL}/share/p/${projectId}`;
}
