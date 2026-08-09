import { cva } from "class-variance-authority";

export const buttonVariants = cva(
	[
		"inline-flex items-center justify-center gap-2",
		"rounded-lg",
		"font-medium",
		"transition",
		"focus-visible:outline-none",
		"focus-visible:ring-2",
		"focus-visible:ring-ring",
		"focus-visible:ring-offset-2",
		"disabled:cursor-not-allowed",
		"disabled:opacity-60",
	],
	{
		variants: {
			variant: {
				primary: [
					"bg-primary",
					"text-primary-foreground",
					"hover:bg-primary-hover",
				],

				secondary: [
					"bg-secondary",
					"text-secondary-foreground",
					"hover:bg-slate-200",
				],

				destructive: [
					"bg-destructive",
					"text-destructive-foreground",
					"hover:bg-red-700",
				],

				outline: [
					"border",
					"border-border",
					"bg-background",
					"hover:bg-accent",
					"hover:text-accent-foreground",
				],

				"outline-destructive": [
					"border",
					"border-destructive/10",
					"bg-destructive/10",
					"text-destructive",
					"hover:bg-destructive",
					"hover:text-destructive-foreground",
				],

				ghost: [
					"bg-transparent",
					"text-foreground",
					"hover:bg-secondary",
				],

				link: [
					"bg-transparent",
					"p-0",
					"text-primary",
					"hover:underline",
				],
			},

			size: {
				sm: "h-9 px-3 text-sm",
				md: "h-11 px-4 text-sm",
				lg: "h-12 px-6 text-base",
				icon: "size-10 p-0",
			},
		},

		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);
