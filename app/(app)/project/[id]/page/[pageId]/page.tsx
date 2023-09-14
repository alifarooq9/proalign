"use client";

import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

type PageIdPageProps = {
    params: {
        pageId: string;
        id: string;
    };
};

export default function PageIdPage({ params }: PageIdPageProps) {
    const { userId } = useAuth();

    const pageDetails = useQuery(api.page.getById, {
        pageId: params.pageId,
        projectId: params.id,
    });

    if (pageDetails === undefined) {
        return <div>Loading...</div>;
    }

    if (!pageDetails) {
        return notFound();
    }

    return (
        <div className="container my-6 flex w-full max-w-5xl justify-center">
            <Editor
                page={{
                    _id: pageDetails._id,
                    content: pageDetails.content,
                    title: pageDetails.title,
                }}
                projectId={params.id}
                userId={userId as string}
            />
        </div>
    );
}
