"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2Icon, SaveIcon } from "lucide-react";
import {
    ProjectStatusSchema,
    ProjectStatus,
    Project,
    projectPriorities,
    projectStatuses,
    ProjectPrioritySchema,
} from "@/types/project";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "./ui/badge";
import { badges } from "@/config/project";
import { UpdateProject } from "@/hooks/useProject";
// import { UpdateProject } from "@/hooks/useProjects";

const ProjectDetailsSchema = z.object({
    name: z
        .string()
        .min(3, "Project name must be at least 3 characters.")
        .max(50, "Project name must be less than 50 characters."),
    description: z
        .string()
        .max(500, "Project description must be less than 500 characters."),
    expectedCompletionDate: z.date(),
    badge: z.string().optional(),
    priority: ProjectPrioritySchema,
    status: ProjectStatusSchema,
});

type CreateProjectType = z.infer<typeof ProjectDetailsSchema>;

type ProjectDetailFormProps = {
    project: Project;
};

export default function ProjectDetailForm({ project }: ProjectDetailFormProps) {
    const form = useForm<CreateProjectType>({
        resolver: zodResolver(ProjectDetailsSchema as any),
        defaultValues: {
            name: project.name,
            expectedCompletionDate: new Date(project.expectedCompletionDate),
            description: project.description,
            status: project.status as ProjectStatus,
            badge: project.badge,
            priority: project.priority,
        },
    });

    const { loading, mutate } = UpdateProject();

    const onSubmit = async (values: CreateProjectType) => {
        await mutate({
            name: values.name,
            description: values.description,
            expectedCompletionDate: values.expectedCompletionDate.toString(),
            status: values.status,
            id: project.id,
            priority: values.priority,
            badge: values.badge,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Manage your project here.</CardDescription>
            </CardHeader>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                >
                    <CardContent className="space-y-4">
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
                                        This is the name of your project.
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
                                        This is the description of your project.
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
                                                            field.onChange(
                                                                badge,
                                                            )
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
                                        This is the badge of your project.
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
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className={cn(
                                                    "w-52",
                                                    // getStatusColor(field.value),
                                                )}
                                            >
                                                <SelectValue placeholder="Change project status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
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
                                        This is the status of your project.
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
                                            {projectPriorities.map(
                                                (priority) => (
                                                    <SelectItem
                                                        key={priority}
                                                        value={priority}
                                                    >
                                                        {priority}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose a priority for your project. It
                                        can be changed later.
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
                                    <FormLabel>
                                        Expected Completion Date
                                    </FormLabel>
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
                                                        format(
                                                            field.value,
                                                            "PPP",
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
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
                                        This is the expected completion date of
                                        your project.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex place-content-start gap-3 border-t-2 border-dashed bg-muted/30 p-5 sm:px-7">
                        <Button disabled={loading} type="submit">
                            {loading ? (
                                <Loader2Icon className="mr-1.5 h-4 w-4 animate-spin" />
                            ) : (
                                <SaveIcon className="mr-1.5 h-4 w-4" />
                            )}
                            <span>Save Changes</span>
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
