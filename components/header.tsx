import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icon";
import { urls } from "@/config/urls";
import { cn } from "@/lib/utils";
import { Fragment, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type HeaderProps = {
    className?: string;
    LinksElement: () => JSX.Element;
    AuthElement: () => JSX.Element;
};

export default function Header({
    className,
    LinksElement,
    AuthElement,
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full sm:p-3">
            <div
                className={cn(
                    "bg-background flex h-14 w-full place-content-between place-items-center rounded-lg border-b border-dashed px-4 sm:border-2",
                    className,
                )}
            >
                <nav className="flex place-items-center space-x-8">
                    <Link href="/" className="flex place-items-center">
                        <Icons.logo className="mr-1.5 h-5 w-5" />
                        <span className="font-bold">PRO ALIGN</span>
                    </Link>

                    <LinksElement />
                </nav>

                <Suspense fallback={<AuthSkeleton />}>
                    <HeaderAuthState AuthElement={AuthElement} />
                </Suspense>
            </div>
        </header>
    );
}

type HeaderAuthStateProps = {
    AuthElement: () => JSX.Element;
};

async function HeaderAuthState({ AuthElement }: HeaderAuthStateProps) {
    const auth = false;

    return (
        <Fragment>
            {auth ? (
                <AuthElement />
            ) : (
                <section className="flex place-items-center space-x-2">
                    <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="hidden sm:flex"
                    >
                        <Link href={urls.auth.login}>Login</Link>
                    </Button>

                    <Button asChild size="sm">
                        <Link href={urls.auth.register}>
                            <span>Get Started</span>
                            <span className="ml-1 hidden font-light italic sm:block">
                                {" "}
                                — it&apos;s free
                            </span>
                        </Link>
                    </Button>
                </section>
            )}
        </Fragment>
    );
}

function AuthSkeleton() {
    return (
        <div className="flex place-items-center space-x-2">
            <Skeleton className="hidden h-9 w-16 sm:block" />
            <Skeleton className="h-9 w-20 sm:w-36" />
        </div>
    );
}
