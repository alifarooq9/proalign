import Header, { HeaderLink } from "@/components/header";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

type WWWLayoutProps = {
    children: ReactNode;
};

const headerLinks: HeaderLink[] = [
    {
        id: "about",
        JSXElement: () => <Link href="/">About</Link>,
    },
    {
        id: "pricing",
        JSXElement: () => <Link href="/">Pricing</Link>,
    },
    {
        id: "contact",
        JSXElement: () => <Link href="/">Contact</Link>,
    },
];

export default function WWWLayout({ children }: WWWLayoutProps) {
    return (
        <Fragment>
            <Header
                links={headerLinks}
                className="container"
                linksContainerClassName="space-x-4"
            />
            {children}
        </Fragment>
    );
}
