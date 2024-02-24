import { Pressable, Text } from "react-native"
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo"
import { Link } from "expo-router"

export default function () {
    const { user } = useUser()
    const { signOut } = useAuth()

    return (
        <>
            <SignedIn>
                <Text>{JSON.stringify(user?.fullName, null, 3)}</Text>
                <Pressable onPress={() => signOut()}>
                    <Text>Sign out</Text>
                </Pressable>
            </SignedIn>
            <SignedOut>
                <Text>You are Signed out</Text>
                <Link href={"/o-auth"}>Sign in</Link>
            </SignedOut>
        </>
    )
}
