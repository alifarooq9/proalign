"use client";

import {
    DrawerContent,
    DrawerIcon,
    DrawerRoot,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes } from "react";
import { create } from "zustand";
import CreateProjectForm from "@/components/create-project-form";

type DrawerStore = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    closeDrawer: () => void;
};

export const useDrawerStore = create<DrawerStore>()((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
    closeDrawer: () => set({ isOpen: false }),
}));

export function CreateProjectDrawer() {
    const { isOpen, setIsOpen } = useDrawerStore();

    return (
        <DrawerRoot open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
            <DrawerContent>
                <DrawerIcon />

                <div className="h-[calc(100vh-8rem)] overflow-y-auto">
                    <div className="container  max-w-6xl space-y-1 ">
                        <DrawerTitle>Create Project</DrawerTitle>
                        <p className="text-muted-foreground">
                            Enter your project details.
                        </p>

                        <CreateProjectForm />
                    </div>
                </div>
            </DrawerContent>
        </DrawerRoot>
    );
}

interface CreateProjectDrawerTriggerProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

export function CreateProjectDrawerTrigger({
    asChild,
    ...props
}: CreateProjectDrawerTriggerProps) {
    const { setIsOpen, isOpen } = useDrawerStore();

    const Comp = asChild ? Slot : "button";

    return <Comp onClick={() => setIsOpen(!isOpen)} {...props} />;
}
