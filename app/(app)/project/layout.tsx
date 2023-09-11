import { ReactNode } from "react";

type ProjectLayoutProps = {
    children: ReactNode;
};

export default function ProjectLayout({ children }: ProjectLayoutProps) {
    return (
        <div className="flex">
            <div className="flex-1">{children}</div>
        </div>
    );
}
