import { ClerkProvider as NextClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { dark } from "@clerk/themes";
import { urls } from "@/config/urls";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GetTheme } from "@/lib/theme";

type ClerkProviderProps = {
    children: ReactNode;
};

export default function ClerkProvider({ children }: ClerkProviderProps) {
    return (
        <NextClerkProvider
            appearance={{
                baseTheme: dark,
                variables: {
                    colorPrimary: "hsl(83 92% 65%)",
                    colorTextOnPrimaryBackground: "hsl(0 0% 0%)",
                    colorBackground: "hsl(0 0% 0%)",
                },
                elements: {
                    formButtonPrimary: cn(
                        buttonVariants({ className: "capitalize" }),
                    ),
                    socialButtonsBlockButton: cn(
                        buttonVariants({
                            variant: "outline",
                            className: "bg-transparent",
                        }),
                    ),
                    card: "border-2 border-border border-dashed ",
                    formFieldInput: "border-2 border-border bg-transparent",
                },
                layout: {
                    logoImageUrl: "/logo.svg",
                    logoLinkUrl: "/",
                    socialButtonsVariant: "blockButton",
                },
            }}
            signInUrl={urls.auth.login}
            signUpUrl={urls.auth.register}
        >
            {children}
        </NextClerkProvider>
    );
}
