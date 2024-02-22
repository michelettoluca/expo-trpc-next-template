import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import express from "express";

export const t = initTRPC.create();
export const appRouter = t.router({
	getUser: t.procedure.input(z.string()).query((opts) => {
		return { id: opts.input, name: "Bilbo" };
	}),
	createUser: t.procedure
		.input(z.object({ name: z.string().min(5) }))
		.mutation(async (opts) => {
			return { a: opts.input.name };
		}),
});

export type AppRouter = typeof appRouter;

const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => ({});
type Context = Awaited<ReturnType<typeof createContext>>;

const app = express();

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);

app.listen(4000);
