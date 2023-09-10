import Header from "@/components/header";
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
    return <div>Auth</div>;
}
