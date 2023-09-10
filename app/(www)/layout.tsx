import Header from "@/components/header";
import Link from "next/link";
import { Fragment, ReactNode } from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { urls } from "@/config/urls";

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
        <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                            <ul className="grid min-w-[300px] grid-cols-1 divide-y px-3 py-1">
                                {features.map((feature) => (
                                    <li
                                        key={feature.title}
                                        className="px-2 py-3"
                                    >
                                        <h3 className="text-sm font-semibold">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground line-clamp-3 text-sm font-light">
                                            {feature.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={urls.www.pricing} legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle}
                        >
                            Pricing
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={urls.www.support} legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle}
                        >
                            Support
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const features = [
    {
        title: "Collaboration",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique",
    },
    {
        title: "Task Management",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique",
    },
    {
        title: "Whiteboard",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique",
    },
    {
        title: "Notion like Pages",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique",
    },
];
