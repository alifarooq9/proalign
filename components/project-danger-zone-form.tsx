"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { urls } from "@/config/urls";

type ProjectDangerZoneFormProps = {
    projectId: string;
    userId: string;
};

const deleteProjectSchema = z.object({
    input: z.enum(["DELETE MY PROJECT"], {
        required_error: "Please type DELETE MY PROJECT to confirm.",
    }),
});

type DeleteProjectSchema = z.infer<typeof deleteProjectSchema>;

export default function ProjectDangerZoneForm({
    projectId,
    userId,
}: ProjectDangerZoneFormProps) {
    const router = useRouter();

    const form = useForm<DeleteProjectSchema>({
        resolver: zodResolver(deleteProjectSchema as any),
    });

    const deleteProjectMutation = useMutation(api.project.deleteById);

    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (data: DeleteProjectSchema) => {
        setLoading(true);

        await deleteProjectMutation({ projectId: projectId, userId: userId })
            .then(() => {
                toast.success("Project deleted successfully.");
                router.push(urls.app.dashboard);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-2xl space-y-3"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Danger Zone</CardTitle>
                        <CardDescription>
                            Delete your project here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="input"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            To verify, type{" "}
                                            <span className="font-semibold">
                                                DELETE MY PROJECT
                                            </span>{" "}
                                            below:
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="My Project"
                                                className="max-w-md"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Project will be deleted forever.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex place-content-end gap-3 border-t-2 border-dashed bg-muted/30 p-5 sm:px-7">
                        <Button type="submit" variant="destructive">
                            {loading && (
                                <Loader2Icon className="mr-1.5 h-4 w-4 animate-spin" />
                            )}
                            <span>Delete the Project</span>
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
