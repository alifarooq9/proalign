import { ClerkProvider as NextClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { dark } from "@clerk/themes";
import { urls } from "@/config/urls";

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
                    borderRadius: "0.7rem",
                },
                layout: {
                    logoImageUrl: "/logo.svg",
                },
            }}
            signInUrl={urls.auth.login}
            signUpUrl={urls.auth.register}
        >
            {children}
        </NextClerkProvider>
    );
}
