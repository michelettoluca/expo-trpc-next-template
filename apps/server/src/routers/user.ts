import { router, loggedProcedure } from "../trpc"

export const userRouter = router({
    create: loggedProcedure.query(({ ctx }) => {
        console.log(ctx.decoded)
        return "molto bene"
    })
})
