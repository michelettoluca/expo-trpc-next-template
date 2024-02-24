import { Pressable, Text } from "react-native"
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo"
import { Link } from "expo-router"
import { trpc } from "../lib"

import * as SecureStorage from "expo-secure-store"

export default function () {
    const { signOut } = useAuth()

    const { data } = trpc.user.findAll.useQuery()

    return (
        <>
            <Text>{data?.length ?? "empty"}</Text>
            <Text>{SecureStorage.getItem("userId")}</Text>
            <SignedIn>
                <Text>You are signed in</Text>
                <Pressable onPress={() => signOut()}>
                    <Text>Sign out</Text>
                </Pressable>
            </SignedIn>
            <SignedOut>
                <Text>You are signed out</Text>
                <Link href={"/oauth"}>Sign in</Link>
            </SignedOut>
        </>
    )
}
