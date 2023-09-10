import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type HeaderShellProps = {
    children: ReactNode;
    className?: string;
};

export default function HeaderShell({ children, className }: HeaderShellProps) {
    return (
        <header className="sticky top-0 z-50 w-full sm:p-3">
            <div
                className={cn(
                    "bg-background flex h-14 w-full place-content-between place-items-center rounded-lg border-b border-dashed px-4 sm:border-2",
                    className,
                )}
            >
                {children}
            </div>
        </header>
    );
}
