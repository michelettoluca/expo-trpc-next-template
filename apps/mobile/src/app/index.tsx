import { Pressable, Text } from "react-native"
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo"
import { Link } from "expo-router"
import { trpc } from "../lib"
import { useState } from "react"

export default function () {
    const { signOut } = useAuth()
    const { user } = useUser()

    const [aa, setAa] = useState(true)

    function toggle() {
        setAa(!aa)
    }

    return (
        <>
            <SignedIn>
                <Text>{JSON.stringify(user?.fullName, null, 3)}</Text>
                <Pressable onPress={() => toggle()}>
                    <Text>Sign out</Text>
                </Pressable>
                {aa && <Aa />}
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
    return <Text>{JSON.stringify(asd.data, null, 3)}</Text>
}
