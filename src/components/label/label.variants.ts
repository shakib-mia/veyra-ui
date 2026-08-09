import { cva } from "class-variance-authority";

export const labelVariants = cva(
	[
		"inline-flex items-center gap-1",
		"font-medium",
		"select-none",
		"text-foreground",
		"cursor-pointer",
		"peer-disabled:cursor-not-allowed",
		"peer-disabled:opacity-50",
	],
	{
		variants: {
			size: {
				sm: "text-xs",
				md: "text-sm",
				lg: "text-base",
			},
		},

		defaultVariants: {
			size: "md",
		},
	},
);
