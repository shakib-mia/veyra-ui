import { cva } from "class-variance-authority";

export const switchVariants = cva(
	[
		"peer",
		"absolute inset-0",
		"size-full",
		"cursor-pointer",
		"appearance-none",
		"rounded-full",
		"border-0",
		"bg-transparent",
		"outline-none",

		"focus-visible:ring-2",
		"focus-visible:ring-ring",
		"focus-visible:ring-offset-2",

		"disabled:cursor-not-allowed",
	],
	{
		variants: {
			size: {
				sm: "h-5 w-9",
				md: "h-6 w-11",
				lg: "h-7 w-[52px]",
			},
		},

		defaultVariants: {
			size: "md",
		},
	},
);
