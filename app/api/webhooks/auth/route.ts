import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { env } from "@/env/server";
import { api } from "@/convex/_generated/api";
import { convex } from "@/components/convex-provider";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new SVIX instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    // Get the ID and type
    const { id } = evt.data;
    const eventType = evt.type;

    // Handle the event
    switch (eventType) {
        case "user.created":
            // Handle user created event
            const createUser = await convex.mutation(api.user.create, {
                clerkId: id as string,
                email: evt.data.email_addresses.map(
                    (email) => email.email_address,
                ),
                firstName: evt.data.first_name,
                lastName: evt.data.last_name,
            });

            return new Response(createUser, { status: 200 });
    }

    return new Response("", { status: 201 });
}
