import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectIdPageLoading() {
    return (
        <div className="px-3">
            <Skeleton className="sticky left-0 top-20 hidden w-72 rounded-lg border-2 border-dashed xl:block xl:h-[calc(100vh-6rem)]" />
        </div>
    );
}
