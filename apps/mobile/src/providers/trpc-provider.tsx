import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "../lib"
import { httpBatchLink } from "@trpc/client"

const queryClient = new QueryClient()

const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: process.env.EXPO_PUBLIC_TRPC_URL!
        })
    ]
})

export function TrpcProvider({ children }: React.PropsWithChildren) {
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    )
}
