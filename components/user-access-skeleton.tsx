import { Skeleton } from "@/components/ui/skeleton";

export function UserAccessLoading() {
    return (
        <div className="grid gap-6">
            <div className="flex h-12 w-full flex-col items-start justify-center space-x-0 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
                <Skeleton className="h-full w-full max-w-[20rem]" />
                <div className="flex h-full w-full flex-row items-center justify-start gap-2 sm:justify-end">
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                </div>
            </div>
            <div className="flex h-12 w-full flex-col items-start justify-center space-x-0 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
                <Skeleton className="h-full w-full max-w-[20rem]" />
                <div className="flex h-full w-full flex-row items-center justify-start gap-2 sm:justify-end">
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                </div>
            </div>
            <div className="flex h-12 w-full flex-col items-start justify-center space-x-0 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
                <Skeleton className="h-full w-full max-w-[20rem]" />
                <div className="flex h-full w-full flex-row items-center justify-start gap-2 sm:justify-end">
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                    <Skeleton className="h-full w-full max-w-[5rem]" />
                </div>
            </div>
        </div>
    );
}
