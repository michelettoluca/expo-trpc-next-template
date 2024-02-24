import { z } from "zod"
import { router, loggedProcedure } from "../trpc"
import { prisma } from "../prisma"

const findById = loggedProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.user.findUnique({
        where: {
            accountId: input
        }
    })
})

const findAll = loggedProcedure.query(async () => {
    return await prisma.user.findMany()
})

export const userRouter = router({
    findById,
    findAll
})
