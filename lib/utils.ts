import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateProjectShareLink(projectId: string): string {
    return `${
        process.env.VERCEL || "http://localhost:3000"
    }/share/p/${projectId}`;
}
