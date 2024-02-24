import * as trpcExpress from "@trpc/server/adapters/express"
import express from "express"
import { appRouter } from "./routers"

export const createContext = ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    token: req.headers.authorization
})
export type Context = Awaited<ReturnType<typeof createContext>>

const app = express()

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
)

app.listen(4000)
