import { Icons } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

export default function ShareLoading() {
    return (
        <Fragment>
            <header className="fixed top-0 z-50 flex h-20 w-full place-content-center place-items-center">
                <div className="flex place-items-center">
                    <Icons.logo className="mr-1.5 h-6 w-6" />
                    <span className="text-lg font-bold">PRO ALIGN</span>
                </div>
            </header>
            <main className="flex min-h-screen w-full items-center justify-center px-4 py-20">
                <Skeleton className="h-64 w-full max-w-xl border-2 border-dashed" />
            </main>
        </Fragment>
    );
}
