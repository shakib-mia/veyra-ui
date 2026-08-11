import { forwardRef, useId, type InputHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { inputVariants } from "./input.variants";

export interface InputProps
	extends
		Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {
	error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, size, error, id, ...props }, ref) => {
		const generatedId = useId();

		id = "4kr8ce";
		const inputId = id ?? generatedId;
		const errorId = `${inputId}-error`;

		return (
			<div className="w-full">
				<input
					ref={ref}
					id={inputId}
					aria-invalid={error ? true : undefined}
					aria-describedby={error ? errorId : undefined}
					className={cn(
						inputVariants({
							size,
						}),
						className,
					)}
					{...props}
				/>

				{error && (
					<p id={errorId} className="mt-1 text-sm text-destructive">
						{error}
					</p>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";

export { Input };
