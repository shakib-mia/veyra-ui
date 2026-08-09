import { cva } from "class-variance-authority";

export const radioVariants = cva(
	[
		"peer",
		"shrink-0",
		"appearance-none",
		"rounded-full",
		"border",
		"border-input",
		"bg-background",
		"transition-colors",
		"duration-fast",
		"ease-default",
		"outline-none",

		"focus-visible:ring-2",
		"focus-visible:ring-ring",
		"focus-visible:ring-offset-2",

		"checked:border-primary",
		"checked:bg-primary",

		"disabled:cursor-not-allowed",
		"disabled:opacity-50",

		"hover:not-disabled:border-primary",
	],
	{
		variants: {
			size: {
				sm: "size-3.5",
				md: "size-4",
				lg: "size-5",
			},
		},

		defaultVariants: {
			size: "md",
		},
	},
);
