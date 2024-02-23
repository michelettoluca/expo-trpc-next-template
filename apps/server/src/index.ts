import * as trpcExpress from "@trpc/server/adapters/express"
import express from "express"
import { appRouter } from "./routers"

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({})
type Context = Awaited<ReturnType<typeof createContext>>

const app = express()

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
)

app.listen(4000)
