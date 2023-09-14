"use client";

import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import useDebounce from "lodash.debounce";
import { Loader2Icon } from "lucide-react";

export default function Editor() {
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
                placeholder: "Type here to write your post...",
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

    const debouncedSave = useDebounce(async () => {
        setSaving(true);
        const savedData = await ref.current?.saver.save();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(savedData);
        setSaving(false);
    }, 750);

    return (
        <div className="w-full space-y-2">
            <div className="flex items-center justify-end">
                <Button disabled={saving} variant="secondary">
                    {saving && (
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <span>{saving ? "Saving" : "Save Changes"}</span>
                </Button>
            </div>
            <TextareaAutosize
                autoFocus
                id="title"
                defaultValue={"Test"}
                placeholder="Post title"
                className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none sm:text-5xl"
            />
            <div
                id="editor"
                className="prose dark:prose-invert dark:prose-neutral min-h-[600px] w-full max-w-5xl rounded-lg border-2 border-dashed bg-background p-2 sm:px-16 sm:py-6"
            />
        </div>
    );
}
