import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

export interface FormFieldProps {
	label?: ReactNode;
	description?: ReactNode;
	error?: ReactNode;
	required?: boolean;
	htmlFor?: string;
	className?: string;
	children: ReactNode;
}

const FormField = ({
	label,
	description,
	error,
	required = false,
	htmlFor,
	className,
	children,
}: FormFieldProps) => {
	return (
		<div className={cn("space-y-2", className)}>
			{label && (
				<div>
					<label
						htmlFor={htmlFor}
						className={cn(
							"inline-flex items-center gap-1",
							"text-sm font-medium text-foreground",
							error && "text-danger",
						)}
					>
						{label}

						{required && (
							<span aria-hidden="true" className="text-danger">
								*
							</span>
						)}
					</label>
				</div>
			)}

			{children}

			{error ? (
				<p
					id={htmlFor ? `${htmlFor}-error` : undefined}
					className="text-xs text-danger"
					role="alert"
				>
					{error}
				</p>
			) : description ? (
				<p
					id={htmlFor ? `${htmlFor}-description` : undefined}
					className="text-xs text-muted-foreground"
				>
					{description}
				</p>
			) : null}
		</div>
	);
};

export { FormField };
