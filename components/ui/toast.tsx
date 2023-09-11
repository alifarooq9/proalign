"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
    return (
        <SonnerToaster
            theme="dark"
            position="top-center"
            toastOptions={{
                style: {
                    backgroundColor: "hsl(var(--background))",
                },
            }}
            richColors
            closeButton
        />
    );
}
