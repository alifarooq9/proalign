import Header from "@/components/header";
import { urls } from "@/config/urls";
import { UserButton } from "@clerk/nextjs";
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
    return <UserButton afterSignOutUrl={urls.auth.login} />;
}
