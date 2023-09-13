import { Skeleton } from "@/components/ui/skeleton";

export default function DetailsPageLoading() {
    return (
        <div className="container flex max-w-4xl items-center justify-center space-y-6 px-0 py-6">
            <Skeleton className="h-96 w-full" />
        </div>
    );
}
