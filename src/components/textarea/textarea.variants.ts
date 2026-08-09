import { cva } from "class-variance-authority";

export const textareaVariants = cva(
	[
		"flex w-full",
		"min-h-24",
		"rounded-lg",
		"border border-input",
		"bg-background",
		"px-3.5 py-3",
		"text-sm text-foreground",
		"placeholder:text-muted-foreground",
		"shadow-xs",
		"transition-colors",
		"duration-fast",
		"ease-default",
		"outline-none",
		"resize-y",
		"focus-visible:border-ring",
		"focus-visible:ring-2",
		"focus-visible:ring-ring/20",
		"disabled:cursor-not-allowed",
		"disabled:opacity-60",
		"aria-invalid:border-danger",
		"aria-invalid:ring-2",
		"aria-invalid:ring-danger/20",
	],
	{
		variants: {
			size: {
				sm: "min-h-20 px-3 py-2.5",
				md: "min-h-24 px-3.5 py-3",
				lg: "min-h-32 px-4 py-3.5",
			},
		},

		defaultVariants: {
			size: "md",
		},
	},
);
