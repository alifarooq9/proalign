import { ClerkProvider as NextClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { dark } from "@clerk/themes";

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
                },
            }}
        >
            {children}
        </NextClerkProvider>
    );
}
