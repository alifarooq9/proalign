"use client";

import { useTheme } from "next-themes";

export type Theme = "light" | "dark" | "system";

export function GetTheme(): Theme {
    const { theme } = useTheme();
    return theme as Theme;
}
