import { AppRouter } from "@repo/server/src/routers"
import { createTRPCReact } from "@trpc/react-query"

export const trpc = createTRPCReact<AppRouter>()
