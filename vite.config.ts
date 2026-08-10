import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),

		dts({
			insertTypesEntry: true,
			include: ["src"],
			exclude: ["src/main.tsx", "src/App.tsx"],
		}),
	],

	build: {
		lib: {
			entry: resolve(process.cwd(), "src/index.ts"),
			name: "VeyraUI",
			fileName: "veyra-ui",
			formats: ["es", "cjs"],
		},

		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"],
		},

		cssCodeSplit: false,

		sourcemap: true,

		emptyOutDir: true,
	},
});
