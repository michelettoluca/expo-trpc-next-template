import { Pressable, Text } from "react-native"
import { useUserContext } from "../../context"

export default function () {
    const { id, signOut } = useUserContext()

    return (
        <Pressable style={{ padding: 16 }} onPress={() => signOut()}>
            <Text>
                {">>>"} {id}
            </Text>
        </Pressable>
    )
}
