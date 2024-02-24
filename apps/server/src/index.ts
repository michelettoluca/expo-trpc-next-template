import * as trpcExpress from "@trpc/server/adapters/express"
import express from "express"
import { appRouter } from "./routers"
import { WebhookEvent } from "@clerk/clerk-sdk-node"
import { Webhook } from "svix"
import bodyParser from "body-parser"

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
if (!WEBHOOK_SECRET) {
    throw new Error("You need a WEBHOOK_SECRET in your .env")
}

export const createContext = ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    token: req.headers.authorization
})
export type Context = Awaited<ReturnType<typeof createContext>>

const app = express()

app.post("/api/webhooks", bodyParser.raw({ type: "application/json" }), async (req, res) => {
    const { headers, body } = req

    const svix_id = headers["svix-id"] as string
    const svix_timestamp = headers["svix-timestamp"] as string
    const svix_signature = headers["svix-signature"] as string

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400
        })
    }

    const webhook = new Webhook(WEBHOOK_SECRET)

    let webhookEvent: WebhookEvent

    try {
        webhookEvent = webhook.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        }) as WebhookEvent
    } catch (err: any) {
        console.log("Webhook failed to verify. Error:", err.message)

        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

    handleClerkWebhook(webhookEvent)

    return res.status(200).json({
        success: true,
        message: "Webhook received"
    })
})

async function handleClerkWebhook({ type }: WebhookEvent) {
    switch (type) {
        case "user.created":
            console.log("Created user")
            break
        case "user.deleted":
            console.log("Deleted user")
            break
        case "user.updated":
            console.log("Updated user")
            break
        default:
            console.error(`Unhandled webhook type ${type}`)
            break
    }
}

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
)

app.listen(4000)
