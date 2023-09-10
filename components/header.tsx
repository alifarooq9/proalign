import Link from "next/link";
import HeaderShell from "@/components/header-shell";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icon";
import { urls } from "@/config/urls";
import { cn } from "@/lib/utils";

export type HeaderLink = {
    id: string;
    JSXElement: () => JSX.Element;
};

type HeaderProps = {
    links: HeaderLink[];
    className?: string;
    linksContainerClassName?: string;
};

export default function Header({
    links,
    className,
    linksContainerClassName,
}: HeaderProps) {
    return (
        <HeaderShell className={className}>
            <nav className="flex place-items-center space-x-8">
                <Link href="/" className="flex place-items-center">
                    <Icons.logo className="mr-1.5 h-5 w-5" />
                    <span className="font-bold">PRO ALIGN</span>
                </Link>

                <div className={cn("hidden md:block", linksContainerClassName)}>
                    {links.map((link) => (
                        <link.JSXElement key={link.id} />
                    ))}
                </div>
            </nav>

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
        </HeaderShell>
    );
}
