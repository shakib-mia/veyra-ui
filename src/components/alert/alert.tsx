import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

export type AlertVariant =
	| "default"
	| "info"
	| "success"
	| "warning"
	| "danger";

export interface AlertProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	"title"
> {
	variant?: AlertVariant;
	icon?: ReactNode;
	title?: ReactNode;
	description?: ReactNode;
	children?: ReactNode;
}

const variantStyles: Record<AlertVariant, string> = {
	default: "border-border bg-card text-card-foreground",

	info: "border-info/20 bg-info/10 text-info",

	success: "border-success/20 bg-success/10 text-success",

	warning: "border-warning/20 bg-warning/10 text-warning",

	danger: "border-danger/20 bg-danger/10 text-danger",
};

const Alert = ({
	variant = "default",
	icon,
	title,
	description,
	children,
	className,
	...props
}: AlertProps) => {
	const content = description ?? children;

	return (
		<div
			role="alert"
			className={cn(
				"flex gap-3 rounded-lg border p-4",
				variantStyles[variant],
				className,
			)}
			{...props}
		>
			{icon && (
				<div className="mt-0.5 shrink-0" aria-hidden="true">
					{icon}
				</div>
			)}

			<div className="min-w-0 flex-1">
				{title && <div className="text-sm font-semibold">{title}</div>}

				{content && (
					<div
						className={cn(
							"text-sm",
							title && "mt-1",
							variant === "default"
								? "text-muted-foreground"
								: "opacity-90",
						)}
					>
						{content}
					</div>
				)}
			</div>
		</div>
	);
};

export { Alert };
