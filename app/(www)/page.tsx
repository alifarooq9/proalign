import { Button } from "@/components/ui/button";
import { urls } from "@/config/urls";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="container grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <section className="space-y-3 py-0 pt-12 sm:py-32">
                <h1 className="text-4xl font-bold sm:text-5xl">
                    Collaborate Effectively on Your Project Ideas
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                    Realize your project idea&apos;s full potential with
                    seamless team collaboration. Our platform equips you for
                    efficient idea execution.
                </p>

                <div className="pt-4">
                    <Button asChild size="lg" className="w-full sm:w-fit">
                        <Link href={urls.auth.register}>
                            <span>Get Started</span>
                            <span className="ml-1 font-light italic">
                                {" "}
                                — it&apos;s free
                            </span>
                        </Link>
                    </Button>
                </div>
            </section>
            <section className="relative h-full w-full py-0 pt-12 sm:py-32">
                <Image
                    fill
                    src={"/hero.svg"}
                    alt="Pro Align Hero Image"
                    className="mt-10"
                />
            </section>
        </main>
    );
}
