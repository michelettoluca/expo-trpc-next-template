import { z } from "zod"
import { router, loggedProcedure, publicProcedure } from "../trpc"

type User = {
    id: number
    firstName: string
    lastName: string
}
const users: User[] = []

const create = publicProcedure
    .input(
        z.object({
            token: z.string(),
            firstName: z.string(),
            lastName: z.string()
        })
    )
    .mutation(({ ctx, input }) => {
        const user: User = {
            id: users.length + 1,
            firstName: input.firstName,
            lastName: input.lastName
        }

        users.push(user)

        return user
    })

const findById = loggedProcedure.input(z.number().min(0)).query(({ input }) => {
    return users.find((u) => u.id === input)
})

export const userRouter = router({
    create,
    findById
})
