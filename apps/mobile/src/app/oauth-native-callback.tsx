import { Redirect } from "expo-router"
import { trpc } from "../lib"
import { useAuth } from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"

export default function () {
    const { userId } = useAuth()

    const { data } = trpc.user.findAccountById.useQuery(userId!, { enabled: !!userId })

    if (!data) {
        return null
    }

    SecureStore.setItem("userId", data.id)

    return <Redirect href="./" />
}
