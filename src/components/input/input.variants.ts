import { cva } from "class-variance-authority";

export const inputVariants = cva(
	[
		"flex w-full",
		"rounded-lg",
		"border border-input",
		"bg-background",
		"text-sm text-foreground",
		"placeholder:text-muted-foreground",
		"shadow-xs",
		"transition-colors",
		"duration-fast",
		"ease-default",
		"outline-none",
		"file:border-0",
		"file:bg-transparent",
		"file:text-sm",
		"file:font-medium",
		"focus-visible:border-ring",
		"focus-visible:ring-2",
		"focus-visible:ring-ring/20",
		"disabled:cursor-not-allowed",
		"disabled:opacity-60",
		"aria-invalid:border-destructive",
		"aria-invalid:ring-2",
		"aria-invalid:ring-destructive/20",
	],
	{
		variants: {
			size: {
				sm: "h-9 px-3",
				md: "h-11 px-3.5",
				lg: "h-12 px-4",
			},
		},

		defaultVariants: {
			size: "md",
		},
	},
);
