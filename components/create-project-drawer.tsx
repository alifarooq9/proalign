"use client";

import {
    DrawerContent,
    DrawerIcon,
    DrawerRoot,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { create } from "zustand";

type DrawerStore = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const useDrawerStore = create<DrawerStore>()((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}));

export function CreateProjectDrawer() {
    const { isOpen, setIsOpen } = useDrawerStore();

    return (
        <DrawerRoot open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
            <DrawerContent>
                <DrawerIcon />

                <div className="min-h-[300px]">
                    <DrawerTitle>Create Project</DrawerTitle>
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
