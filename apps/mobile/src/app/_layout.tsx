import { Slot } from "expo-router"
import { AuthProvider, TrpcProvider } from "../providers"
import { StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default function () {
    return (
        <AuthProvider>
            <TrpcProvider>
                <View style={styles.container}>
                    <Slot />
                </View>
            </TrpcProvider>
        </AuthProvider>
    )
}
