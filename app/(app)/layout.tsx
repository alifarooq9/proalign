import Header from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";
import { urls } from "@/config/urls";
import { UserButton } from "@clerk/nextjs";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Fragment, ReactNode } from "react";

type AppLayoutProps = {
    children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <Fragment>
            <Header AuthElement={AuthElement} />
            {children}
        </Fragment>
    );
}

function AuthElement() {
    return (
        <Fragment>
            <ClerkLoading>
                <Skeleton className="aspect-square w-10 rounded-full" />
            </ClerkLoading>
            <ClerkLoaded>
                <UserButton afterSignOutUrl={urls.auth.login} />
            </ClerkLoaded>
        </Fragment>
    );
}
