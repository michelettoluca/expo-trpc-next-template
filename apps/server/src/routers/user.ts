import { router, loggedProcedure } from "../trpc"

export const userRouter = router({
    create: loggedProcedure.query(({ ctx }) => {
        return "molto bene"
    })
})
