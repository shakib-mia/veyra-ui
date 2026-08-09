import { cva } from "class-variance-authority";

export const badgeVariants = cva(
	[
		"inline-flex items-center justify-center",
		"whitespace-nowrap",
		"rounded-full",
		"px-2.5 py-1",
		"text-xs font-medium",
		"transition-colors",
	],
	{
		variants: {
			variant: {
				default: ["bg-muted", "text-muted-foreground"],

				primary: ["bg-primary/10", "text-primary"],

				secondary: ["bg-secondary", "text-secondary-foreground"],

				success: ["bg-success/10", "text-success"],

				warning: ["bg-warning/10", "text-warning"],

				danger: ["bg-danger/10", "text-danger"],

				info: ["bg-info/10", "text-info"],

				outline: [
					"border",
					"border-border",
					"bg-transparent",
					"text-foreground",
				],
			},
		},

		defaultVariants: {
			variant: "default",
		},
	},
);
