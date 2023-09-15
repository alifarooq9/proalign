import { SignUp } from "@clerk/nextjs";
import { urls } from "@/config/urls";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: "Register | PRO ALIGN",
    },
    description:
        "Register to PRO ALIGN, your all-in-one solution for efficient task management. Create, organize, and share tasks, and pages with your team effortlessly.",
};

export default function RegisterPage() {
    return (
        <main className="grid min-h-screen grid-cols-1 xl:grid-cols-3">
            <aside className="hidden h-full w-full border-r bg-card/10 backdrop-blur-[1px] xl:block"></aside>
            <section className="container col-span-1 flex flex-col place-content-center place-items-center px-4 xl:col-span-2">
                <SignUp
                    redirectUrl={urls.app.dashboard}
                    signInUrl={urls.auth.login}
                />
            </section>
        </main>
    );
}
