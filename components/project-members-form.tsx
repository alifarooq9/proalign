import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function ProjectMembersForm() {
    return (
        <Card className="container max-w-4xl px-0">
            <CardHeader>
                <CardTitle>Project Collaborators</CardTitle>
                <CardDescription>
                    Manage your project collaborators here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <h4 className="text-sm font-medium">
                        People with ownership
                    </h4>
                    <div className="grid gap-6">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="/avatars/03.png" />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">
                                        Olivia Martin
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        m@example.com
                                    </p>
                                </div>
                            </div>
                            <Select defaultValue="edit">
                                <SelectTrigger className="ml-auto w-[110px]">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="edit">
                                        Can edit
                                    </SelectItem>
                                    <SelectItem value="view">
                                        Can view
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="/avatars/05.png" />
                                    <AvatarFallback>IN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">
                                        Isabella Nguyen
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        b@example.com
                                    </p>
                                </div>
                            </div>
                            <Select defaultValue="view">
                                <SelectTrigger className="ml-auto w-[110px]">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="edit">
                                        Can edit
                                    </SelectItem>
                                    <SelectItem value="view">
                                        Can view
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                    <h4 className="text-sm font-medium">People with access</h4>
                    <div className="grid gap-6">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="/avatars/03.png" />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">
                                        Olivia Martin
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        m@example.com
                                    </p>
                                </div>
                            </div>
                            <Select defaultValue="edit">
                                <SelectTrigger className="ml-auto w-[110px]">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="edit">
                                        Can edit
                                    </SelectItem>
                                    <SelectItem value="view">
                                        Can view
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="/avatars/05.png" />
                                    <AvatarFallback>IN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">
                                        Isabella Nguyen
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        b@example.com
                                    </p>
                                </div>
                            </div>
                            <Select defaultValue="view">
                                <SelectTrigger className="ml-auto w-[110px]">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="edit">
                                        Can edit
                                    </SelectItem>
                                    <SelectItem value="view">
                                        Can view
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="/avatars/01.png" />
                                    <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">
                                        Sofia Davis
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        p@example.com
                                    </p>
                                </div>
                            </div>
                            <Select defaultValue="view">
                                <SelectTrigger className="ml-auto w-[110px]">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="edit">
                                        Can edit
                                    </SelectItem>
                                    <SelectItem value="view">
                                        Can view
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
