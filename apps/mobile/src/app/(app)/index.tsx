import { Pressable, Text, View } from "react-native"
import { useUserContext } from "../../context"
import { trpc } from "../../lib"

export default function () {
    const { id, signOut } = useUserContext()

    const utils = trpc.useUtils()

    const { data } = trpc.user.findAll.useQuery()
    const { mutate } = trpc.user.deleteAll.useMutation({
        onMutate: () => utils.user.findAll.invalidate()
    })

    return (
        <View>
            {data?.map((u) => (
                <Text key={u.id} style={{ color: u.id === id ? "red" : "black" }}>
                    {u.accountId}
                </Text>
            ))}
            <Pressable style={{ padding: 16 }} onPress={() => mutate(id)}>
                <Text>clear</Text>
            </Pressable>

            <Pressable style={{ padding: 16 }} onPress={() => signOut()}>
                <Text>sign out</Text>
            </Pressable>
        </View>
    )
}
