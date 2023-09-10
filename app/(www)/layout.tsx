import Header from "@/components/header";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

type WWWLayoutProps = {
    children: ReactNode;
};

export default function WWWLayout({ children }: WWWLayoutProps) {
    return (
        <Fragment>
            <Header className="container" LinksElement={LinksElement} />
            {children}
        </Fragment>
    );
}

function LinksElement() {
    return (
        <div className="hidden md:flex md:place-items-center md:space-x-4">
            <Link href="/">About</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Contact</Link>
        </div>
    );
}
