import { cva } from "class-variance-authority";

export const selectVariants = cva(["w-full", "text-sm"], {
	variants: {
		size: {
			sm: "text-sm",
			md: "text-sm",
			lg: "text-base",
		},
	},

	defaultVariants: {
		size: "md",
	},
});
