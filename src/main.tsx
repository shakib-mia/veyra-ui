import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
export { cn } from "./lib/cn";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
