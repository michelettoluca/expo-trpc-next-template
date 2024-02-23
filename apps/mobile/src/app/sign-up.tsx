import React from "react"
import * as WebBrowser from "expo-web-browser"
import { Button, Pressable, Text } from "react-native"
import { useOAuth } from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser"

WebBrowser.maybeCompleteAuthSession()

const SignInWithOAuth = () => {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow()

            if (createdSessionId) {
                setActive?.({ session: createdSessionId })
            } else {
            }
        } catch (err) {
            console.error("OAuth error", err)
        }
    }, [])

    return (
        <Pressable onPress={onPress}>
            <Text>Sign in</Text>
        </Pressable>
    )
}
export default SignInWithOAuth
