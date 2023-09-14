"use client";

import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import useDebounce from "lodash.debounce";
import { Loader2Icon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type EditorProps = {
    page: {
        _id: string;
        content: string;
        title: string;
    };
    projectId: string;
    userId: string;
};

export default function Editor({ page, projectId, userId }: EditorProps) {
    const [saving, setSaving] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const ref = useRef<EditorJS>();

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Embed = (await import("@editorjs/embed" as any)).default;
        const Table = (await import("@editorjs/table" as any)).default;
        const List = (await import("@editorjs/list" as any)).default;
        const Code = (await import("@editorjs/code" as any)).default;
        const LinkTool = (await import("@editorjs/link" as any)).default;
        const InlineCode = (await import("@editorjs/inline-code" as any))
            .default;
        const Checklist = (await import("@editorjs/checklist" as any)).default;

        if (!ref.current) {
            const editor: EditorJS = new EditorJS({
                holder: "editor",
                onReady() {
                    ref.current = editor;
                },
                data:
                    page.content !== ""
                        ? JSON.parse(page.content)
                        : {
                              blocks: [],
                              time: new Date(),
                          },
                placeholder: "Type your page content here...",
                inlineToolbar: true,
                tools: {
                    header: Header,
                    linkTool: LinkTool,
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed,
                    checklist: Checklist,
                },
                onChange: () => {
                    debouncedSave();
                },
            });
        }
    }, []);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            initializeEditor();

            return () => {
                ref.current?.destroy();
                ref.current = undefined;
            };
        }
    }, [isMounted, initializeEditor]);

    const [title, setTile] = useState<string>(page.title);

    const updatePage = useMutation(api.page.update);

    const handleSave = async () => {
        setSaving(true);
        const savedData = await ref.current?.saver.save();
        await updatePage({
            content: JSON.stringify(savedData),
            pageId: page._id,
            projectId: projectId,
            title: title,
            userId: userId,
        });
        setSaving(false);
    };

    const debouncedSave = useDebounce(async () => {
        handleSave();
    }, 1000);

    return (
        <div className="w-full space-y-2">
            <div className="flex items-center justify-end">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    variant="secondary"
                >
                    {saving && (
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <span>{saving ? "Saving" : "Save Changes"}</span>
                </Button>
            </div>
            <TextareaAutosize
                autoFocus
                id="title"
                value={title}
                onChange={(e) => {
                    setTile(e.currentTarget.value);
                }}
                placeholder="Post title"
                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none sm:text-5xl"
            />
            <div
                id="editor"
                className="prose min-h-[600px] w-full max-w-5xl rounded-lg border-2 border-dashed bg-background p-2 dark:prose-neutral dark:prose-invert sm:px-16 sm:py-6"
            />
        </div>
    );
}
