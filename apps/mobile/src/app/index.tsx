import { StyleSheet, Text, View } from "react-native";
import { trpc } from "../lib";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default function () {
	const test = trpc.getUser.useQuery("test");
	return (
		<View style={styles.container}>
			<Text>{JSON.stringify(test.data, null, 3)}</Text>
		</View>
	);
}
