import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],

	build: {
		emptyOutDir: false,

		lib: {
			entry: "src/index.ts",
			name: "VeyraUI",
			formats: ["es"],
			fileName: "veyra-ui",
		},

		rollupOptions: {
			external: (id) => {
				return (
					id === "react" ||
					id === "react-dom" ||
					id === "react-select" ||
					id.startsWith("react/") ||
					id.startsWith("react-dom/")
				);
			},
		},
	},
});
