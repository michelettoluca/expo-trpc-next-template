import { z } from "zod"
import { router, loggedProcedure, publicProcedure } from "../trpc"
import { prisma } from "../prisma"

const findByAccountId = publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.user.findUnique({
        where: {
            accountId: input
        }
    })
})

const findAll = publicProcedure.query(async () => {
    return await prisma.user.findMany()
})

export const userRouter = router({
    findByAccountId,
    findAll
})
