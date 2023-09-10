import { Fragment, ReactNode } from "react";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type AuthLayoutProps = {
    children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <Fragment>
            <header className="fixed left-0 right-0 top-0 z-50 flex h-20 w-full place-content-start place-items-center px-4">
                <Button variant="ghost" asChild>
                    <Link href="/">
                        <ChevronLeftIcon className="mr-1 h-4 w-4" />
                        <span>Home</span>
                    </Link>
                </Button>
            </header>
            {children}
        </Fragment>
    );
}
