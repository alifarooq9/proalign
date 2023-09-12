"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2Icon, PlusCircleIcon, XIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CreateProjectDrawerTrigger } from "@/components/create-project-drawer";
import {
    ProjectPrioritySchema,
    ProjectStatusSchema,
    projectPriorities,
    projectStatuses,
} from "@/types/project";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreateProject } from "@/hooks/useProject";
import { badges } from "@/config/project";

const createProjectSchema = z.object({
    name: z
        .string()
        .min(3, "Project name must be at least 3 characters.")
        .max(50, "Project name must be less than 50 characters."),
    description: z
        .string()
        .min(3, "Project name must be at least 3 characters.")
        .max(500, "Project description must be less than 500 characters."),
    expectedCompletionDate: z.date(),
    badge: z.string().optional(),
    status: ProjectStatusSchema,
    priority: ProjectPrioritySchema,
});

type CreateProjectType = z.infer<typeof createProjectSchema>;

export default function CreateProjectForm() {
    const form = useForm<CreateProjectType>({
        resolver: zodResolver(createProjectSchema as any),
        defaultValues: {
            name: "",
            badge: "",
            description: "",
            priority: "Medium",
            status: "Todo",
        },
    });

    const { mutate, loading } = CreateProject();

    const onSubmit = async (values: CreateProjectType) => {
        await mutate({
            name: values.name,
            description: values.description,
            badge: values.badge,
            expectedCompletionDate:
                values.expectedCompletionDate.toLocaleString(),
            priority: values.priority,
            status: values.status,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="space-y-4 py-5 sm:py-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="My Project"
                                        className="max-w-md"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Create a name for your project. It can be
                                    changed later.
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
                                <FormLabel>Project Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="You can write your project description here."
                                        className="max-w-xl"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Create a description for your project. It
                                    can be changed later.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="badge"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Badge</FormLabel>
                                <FormControl>
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="My Project"
                                            className="w-full sm:max-w-[15rem]"
                                            {...field}
                                        />
                                        <div className="flex flex-wrap gap-1.5">
                                            {badges.map((badge) => (
                                                <Badge
                                                    key={badge}
                                                    variant="secondary"
                                                    onClick={() =>
                                                        field.onChange(badge)
                                                    }
                                                    className={cn(
                                                        "cursor-pointer",
                                                    )}
                                                >
                                                    {badge}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Create a badge or choose from the list. It
                                    can be changed later.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full sm:max-w-[15rem]">
                                            <SelectValue placeholder="Select project status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="z-[1000]">
                                        {projectStatuses.map((status) => (
                                            <SelectItem
                                                key={status}
                                                value={status}
                                            >
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Choose a status for your project. It can be
                                    changed later.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Priority</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full sm:max-w-[15rem]">
                                            <SelectValue placeholder="Select project status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="z-[1000]">
                                        {projectPriorities.map((priority) => (
                                            <SelectItem
                                                key={priority}
                                                value={priority}
                                            >
                                                {priority}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Choose a priority for your project. It can
                                    be changed later.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="expectedCompletionDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col pt-1.5">
                                <FormLabel>Expected Completion Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="z-[10000] w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => {
                                                return date <= new Date();
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Choose an expected completion date for your
                                    project. It can be changed later.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex place-content-end gap-3 border-t-2 border-dashed p-5 sm:px-8">
                    <CreateProjectDrawerTrigger asChild>
                        <Button
                            type="button"
                            disabled={loading}
                            variant="ghost"
                        >
                            <XIcon className="mr-1.5 h-4 w-4" />
                            <span>Close</span>
                        </Button>
                    </CreateProjectDrawerTrigger>
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <Loader2Icon className="mr-1.5 h-4 w-4 animate-spin" />
                        ) : (
                            <PlusCircleIcon className="mr-1.5 h-4 w-4" />
                        )}
                        <span>Create Project</span>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
