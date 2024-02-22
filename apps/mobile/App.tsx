import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "server/src/index";

export const trpc = createTRPCReact<AppRouter>();

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

export default function App() {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://192.168.1.12:4000/trpc",
				}),
			],
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Aa />
			</QueryClientProvider>
		</trpc.Provider>
	);
}

function Aa() {
	const asd = trpc.getUser.useQuery("asd");

	return <Text>{JSON.stringify(asd, null, 3)}</Text>;
}
