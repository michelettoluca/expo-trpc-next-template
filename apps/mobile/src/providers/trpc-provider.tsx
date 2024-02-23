import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { trpc } from "../lib";
import { httpBatchLink } from "@trpc/client";

export function TrpcProvider({ children }: React.PropsWithChildren) {
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
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
}
