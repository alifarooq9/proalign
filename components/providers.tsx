import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";

type ProvidersProps = {
    children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return <ThemeProvider>{children}</ThemeProvider>;
}
