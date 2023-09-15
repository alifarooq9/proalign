"use client";

import { urls } from "@/config/urls";
import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convex";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false,
    loading: () => <LoadingEditor />,
});

type PageIdPageProps = {
    params: {
        pageId: string;
        id: string;
    };
};

export default function PageIdPage({ params }: PageIdPageProps) {
    const router = useRouter();
    const { userId } = useAuth();

    const pageDetails = useQuery(api.page.getById, {
        pageId: params.pageId,
        projectId: params.id,
    });

    const userProjects = useQuery(api.project.getUsersProjectById, {
        projectId: params.id,
        userId: userId as string,
    });

    if (pageDetails === undefined) {
        return <LoadingEditor />;
    }

    if (!pageDetails) {
        return router.push(urls.app.projectDetails(params.id));
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
                canEdit={
                    userProjects?.role === "canEdit" ||
                    userProjects?.role === "owner"
                }
            />
        </div>
    );
}

function LoadingEditor() {
    return (
        <div className="w-full pt-20">
            <div className="flex items-center justify-center">
                <Loader2Icon className="mr-3 h-12 w-12 animate-spin" />
                <p className="text-2xl font-semibold">Loading your Editor</p>
            </div>
        </div>
    );
}
