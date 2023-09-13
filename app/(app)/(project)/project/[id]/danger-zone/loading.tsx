import { Skeleton } from "@/components/ui/skeleton";

export default function CollaboratorsLoadibg() {
    return (
        <div className="container flex w-full max-w-4xl items-center justify-center space-y-6 px-0 py-6">
            <div className="container w-full max-w-4xl space-y-2">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-52 w-full" />
            </div>
        </div>
    );
}
