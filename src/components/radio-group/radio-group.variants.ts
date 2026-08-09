import { cva } from "class-variance-authority";

export const radioGroupItemVariants = cva(
	[
		"peer relative shrink-0 rounded-full border",
		"bg-background",
		"transition-colors duration-fast ease-default",
		"focus-visible:outline-none",
		"focus-visible:ring-2",
		"focus-visible:ring-ring",
		"focus-visible:ring-offset-2",
		"disabled:cursor-not-allowed",
		"disabled:opacity-50",
		"checked:border-primary",
	],
	{
		variants: {
			size: {
				sm: "size-4",
				md: "size-5",
				lg: "size-6",
			},
		},

		defaultVariants: {
			size: "md",
		},
	},
);
