import React, { useCallback } from "react"
import * as WebBrowser from "expo-web-browser"
import { Pressable, Text } from "react-native"
import { useOAuth } from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../hooks/use-warm-up-browser"

WebBrowser.maybeCompleteAuthSession()

export default function () {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

    const onPress = useCallback(async () => {
        const { createdSessionId, setActive } = await startOAuthFlow()

        if (createdSessionId) {
            await setActive!({ session: createdSessionId })
        }
    }, [])

    return (
        <Pressable onPress={onPress}>
            <Text>Sign in</Text>
        </Pressable>
    )
}
