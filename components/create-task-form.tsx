"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

type CreateTaskFormProps = {
    columns: { id: string; title: string }[];
    columnId: string;
};

const CreateTaskSchema = z.object({
    title: z
        .string()
        .min(2, "Title must be at least 2 characters long")
        .max(255, "Title must be at most 255 characters long"),
    description: z
        .string()
        .max(255, "Description must be at most 255 characters long"),
    columnId: z.string(),
});

type CreateTaskSchema = z.infer<typeof CreateTaskSchema>;

export default function CreateTaskForm({
    columnId,
    columns,
}: CreateTaskFormProps) {
    const form = useForm<CreateTaskSchema>({
        resolver: zodResolver(CreateTaskSchema as any),
        defaultValues: {
            columnId,
            title: "",
            description: "",
        },
    });

    const onSubmit = async (values: CreateTaskSchema) => {
        console.log(values);
    };

    return (
        <div className="flex w-full justify-end p-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="icon">
                        <PlusCircleIcon className="h-5 w-5" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a Task</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="My Task"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Create a title for your task.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your task description here"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Create a description for your task.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="columnId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Column</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select project status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="z-[1000]">
                                                {columns.map((column) => (
                                                    <SelectItem
                                                        key={column.id}
                                                        value={column.id}
                                                    >
                                                        {column.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select the column for your task.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <DialogFooter>
                        <Button>
                            <PlusCircleIcon className="mr-1.5 h-4 w-4" />
                            <span>Create</span>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
