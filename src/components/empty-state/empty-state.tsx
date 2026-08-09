import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

export interface EmptyStateProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	"title"
> {
	icon?: ReactNode;
	title?: ReactNode;
	description?: ReactNode;
	action?: ReactNode;
}

const EmptyState = ({
	icon,
	title = "No data found",
	description,
	action,
	className,
	...props
}: EmptyStateProps) => {
	return (
		<div
			className={cn(
				"flex min-h-56 flex-col items-center justify-center",
				"px-6 py-10 text-center",
				className,
			)}
			{...props}
		>
			{icon && (
				<div
					aria-hidden="true"
					className={cn(
						"mb-4 flex size-12 items-center justify-center",
						"rounded-full bg-secondary",
						"text-muted-foreground",
					)}
				>
					{icon}
				</div>
			)}

			{title && (
				<h3 className="text-sm font-semibold text-foreground">
					{title}
				</h3>
			)}

			{description && (
				<p className="mt-1 max-w-md text-sm text-muted-foreground">
					{description}
				</p>
			)}

			{action && <div className="mt-4">{action}</div>}
		</div>
	);
};

export { EmptyState };
