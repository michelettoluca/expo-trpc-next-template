import { useAuth } from "@clerk/clerk-expo"
import { Pressable, Text } from "react-native"

export default function () {
    const { signOut } = useAuth()

    return (
        <Pressable style={{ padding: 16 }} onPress={() => signOut()}>
            <Text>App</Text>
        </Pressable>
    )
}
