import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

export default function PageIdPage() {
    return (
        <div className="container my-6 flex w-full max-w-5xl justify-center">
            <Editor />
        </div>
    );
}
