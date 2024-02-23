import { router, publicProcedure } from "../trpc"

export const userRouter = router({
    create: publicProcedure.query(() => "created")
})
