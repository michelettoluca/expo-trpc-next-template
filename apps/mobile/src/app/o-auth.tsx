import React, { useCallback } from "react"
import * as WebBrowser from "expo-web-browser"
import { Pressable, Text } from "react-native"
import { useOAuth } from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../hooks/use-warm-up-browser"
import { trpc } from "../lib"

WebBrowser.maybeCompleteAuthSession()

export default function () {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })
    const { mutateAsync } = trpc.user.create.useMutation()

    const onPress = useCallback(async () => {
        const { createdSessionId, setActive } = await startOAuthFlow()

        if (createdSessionId) {
            await setActive!({ session: createdSessionId })
            await mutateAsync({ token: createdSessionId, firstName: "Pietro", lastName: "Smusi" })
        }
    }, [])

    return (
        <Pressable onPress={onPress}>
            <Text>Sign in</Text>
        </Pressable>
    )
}
