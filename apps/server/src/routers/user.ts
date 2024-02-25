import { z } from "zod"
import { router, publicProcedure } from "../trpc"
import { prisma } from "../prisma"
import { User } from "@prisma/client"

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

const pollUser = publicProcedure
    .input(
        z.object({
            accountId: z.string()
        })
    )
    .query(async ({ input }) => {
        return await waitUntilPresent(() => prisma.user.findUnique({ where: { accountId: input.accountId } }))
    })

function waitUntilPresent<T>(callback: () => Promise<T>): Promise<T> {
    return new Promise((resolve) => {
        const interval = setInterval(async () => {
            const match = await callback()

            if (match) {
                clearInterval(interval)
                resolve(match)
            }
        }, 1000)
    })
}

const deleteAll = publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.user.deleteMany({
        where: {
            NOT: {
                id: {
                    equals: input
                }
            }
        }
    })
})

export const userRouter = router({
    findByAccountId,
    findAll,
    deleteAll,
    pollUser
})
