import { Pressable, StyleSheet, Text, View } from "react-native"
import { trpc } from "../lib"
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo"
import { Link } from "expo-router"

const SignOut = () => {
    return <View></View>
}

export default function () {
    const { signOut } = useAuth()
    const { user } = useUser()

    return (
        <>
            <SignedIn>
                <Text>{JSON.stringify(user, null, 3)}</Text>
                <Pressable onPress={() => signOut()}>
                    <Text>Sign out</Text>
                </Pressable>
            </SignedIn>
            <SignedOut>
                <Text>You are Signed out</Text>
                <Link href={"/sign-up"}>Sign up</Link>
            </SignedOut>
        </>
    )
}
