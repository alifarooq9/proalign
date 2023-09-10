import { Button } from "@/components/ui/button";
import { SignUp } from "@clerk/nextjs";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { urls } from "@/config/urls";

export default function RegisterPage() {
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
            <main className="grid min-h-screen grid-cols-1 xl:grid-cols-3">
                <aside className="hidden h-full w-full border-r bg-card/10 backdrop-blur-[1px] xl:block"></aside>
                <section className="container col-span-1 flex flex-col place-content-center place-items-center px-4 xl:col-span-2">
                    <SignUp
                        redirectUrl={urls.app.dashboard}
                        signInUrl={urls.auth.login}
                    />
                </section>
            </main>
        </Fragment>
    );
}
