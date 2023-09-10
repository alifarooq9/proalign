import { ReactNode } from "react";

type AppHeaderProps = {
    children?: ReactNode;
    title: string;
    description: string;
};

export default function AppHeader({
    title,
    description,
    children,
}: AppHeaderProps) {
    return (
        <div className="mt-4 flex flex-col place-content-between place-items-start space-y-3 sm:flex-row sm:space-y-0">
            <div>
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            {children && children}
        </div>
    );
}
