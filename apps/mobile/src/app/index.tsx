import { Pressable, Text } from "react-native"
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo"
import { Link } from "expo-router"
import { trpc } from "../lib"

export default function () {
    const { signOut } = useAuth()
    const { user } = useUser()

    return (
        <>
            <SignedIn>
                <Text>{JSON.stringify(user?.fullName, null, 3)}</Text>
                <Pressable onPress={() => signOut()}>
                    <Text>Sign out</Text>
                </Pressable>
                <Aa />
            </SignedIn>
            <SignedOut>
                <Text>You are Signed out</Text>
                <Link href={"/sign-up"}>Sign up</Link>
            </SignedOut>
        </>
    )
}

function Aa() {
    const asd = trpc.user.create.useQuery()
    return null
}
