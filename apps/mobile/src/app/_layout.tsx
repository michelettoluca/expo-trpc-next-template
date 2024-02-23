import { Slot } from "expo-router";
import { TrpcProvider } from "../providers";

export default function () {
	return (
		<TrpcProvider>
			<Slot />
		</TrpcProvider>
	);
}
