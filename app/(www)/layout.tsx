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
import { Button } from "@/components/ui/button";
import { siteFeatures } from "@/config/sideContent";

type WWWLayoutProps = {
    children: ReactNode;
};

export default function WWWLayout({ children }: WWWLayoutProps) {
    return (
        <Fragment>
            <Header
                className="container"
                LinksElement={LinksElement}
                AuthElement={() => (
                    <Button asChild>
                        <Link href={urls.app.dashboard}>Dashboard</Link>
                    </Button>
                )}
            />
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
                                {siteFeatures.map((feature) => (
                                    <li
                                        key={feature.title}
                                        className="px-2 py-3"
                                    >
                                        <h3 className="text-sm font-semibold">
                                            {feature.title}
                                        </h3>
                                        <p className="line-clamp-3 text-sm font-light text-muted-foreground">
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
